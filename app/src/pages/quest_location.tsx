import { useState, useRef, useMemo, useEffect } from 'react';
import styles from "../styles/quest_location.module.scss"
import LocationModal from "../components/LocationModal";
import MapView from "../components/MapView";
import type { MapLocation } from "../components/MapView";
import images from "../hooks/images";
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationData {
    name: string;
    address: string;
    openTime: string;
    lat: number;
    lng: number;
    reviews?: string[];
    types?: string[];
}

interface ApiStoreData {
    end_hours: string;
    location: {
        lat: number;
        lng: number;
    };
    reviews: string[];
    start_hours: string;
    store_address: string;
    store_name: string;
    types: string[];
}

interface ApiResponse {
    Message: string;
    Status: number;
    Data: {
        data: {
            stores: ApiStoreData[];
        };
        status: number;
    };
}

interface FormData {
    plan: string;
    endTime: string;
    startLocation: string;
    budget: number;
    genre: string;
    questData?: ApiResponse;
}

export default function Quest_location() {
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [locations, setLocations] = useState<LocationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const listWrapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state as FormData || {};

    // APIからクエストデータを取得または既存データを使用
    const loadQuestData = async () => {
        try {
            setIsLoading(true);
            
            // quest_theme から questData が渡されている場合はそれを使用
            if (formData.questData && formData.questData.Status === 201 && formData.questData.Data?.data?.stores) {
                const storeData = formData.questData.Data.data.stores.map((store: ApiStoreData) => ({
                    name: store.store_name,
                    address: store.store_address,
                    openTime: `${store.start_hours}~${store.end_hours}`,
                    lat: store.location.lat,
                    lng: store.location.lng,
                    reviews: store.reviews,
                    types: store.types
                }));
                setLocations(storeData);
                return;
            }

            // フォールバック: 直接APIを呼び出す
            const response = await fetch('http://go-server:18080/auth/quest/quests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    schedule: formData.plan || "映画",
                    end_time: formData.endTime || "21:00",
                    start_prace: formData.startLocation || "梅田",
                    budget: formData.budget || 5000,
                    genre: formData.genre || "ご飯系"
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data: ApiResponse = await response.json();
            
            if (data.Status === 201 && data.Data?.data?.stores) {
                const storeData = data.Data.data.stores.map((store: ApiStoreData) => ({
                    name: store.store_name,
                    address: store.store_address,
                    openTime: `${store.start_hours}~${store.end_hours}`,
                    lat: store.location.lat,
                    lng: store.location.lng,
                    reviews: store.reviews,
                    types: store.types
                }));
                setLocations(storeData);
            }
        } catch (error) {
            console.error('API fetch error:', error);
            // エラー時はデフォルトデータを使用
            setLocations([
                {
                    name: "丸亀製麺 梅田店",
                    address: "大阪府大阪市北区梅田1丁目11-4 大阪駅前第4ビル B1F",
                    openTime: "11:00~22:00",
                    lat: 34.7035,
                    lng: 135.4992
                },
                {
                    name: "やよい軒 梅田店",
                    address: "大阪府大阪市北区梅田1丁目1-3 大阪駅前第1ビル B2F",
                    openTime: "07:00~23:00",
                    lat: 34.7041,
                    lng: 135.4988
                },
                {
                    name: "松屋 梅田店",
                    address: "大阪府大阪市北区梅田1丁目2-2 大阪駅前第2ビル 1F",
                    openTime: "24時間営業",
                    lat: 34.7044,
                    lng: 135.4985
                },
                {
                    name: "大阪王将 梅田店",
                    address: "大阪府大阪市北区梅田1丁目3-1 大阪駅前第3ビル B1F",
                    openTime: "11:00~23:00",
                    lat: 34.7039,
                    lng: 135.4995
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadQuestData();
    }, []);

    // マップ用のデータを作成（無限ループを避けるためuseMemoを使用）
    const mapLocations: MapLocation[] = useMemo(() => {
        const tohoLocation: MapLocation = {
            name: "TOHOシネマズ 梅田 本館",
            lat: 34.70278,
            lng: 135.49744,
            isSpecial: true,
            address: "大阪府大阪市北区梅田1丁目12-6 E-MA 6F-7F",
            openTime: "9:00~23:00"
        };

        return [
            tohoLocation,
            ...locations.map((loc: LocationData) => ({
                name: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                address: loc.address,
                openTime: loc.openTime
            }))
        ];
    }, [locations]);

    const mapCenter = useMemo(() => ({
        lat: 34.70278, 
        lng: 135.49744
    }), []);

    const handleLocationClick = (location: LocationData) => {
        setSelectedLocation(location);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLocation(null);
    };

    const handleSelectLocation = () => {
        // 選び直すロジック
        handleCloseModal();
    };

    const handleStartQuest = () => {
        // クエスト開始のロジック - 選択された店舗情報を含めて遷移
        if (selectedLocation) {
            navigate('/quest_playing', { 
                state: { 
                    selectedStore: selectedLocation 
                } 
            });
        }
        handleCloseModal();
    };

    const handleBack = () => {
        navigate('/quest-theme', { state: formData });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        // 下にスワイプした場合（deltaY > 0）のみ処理
        if (deltaY > 50) {
            setIsMinimized(true);
        } else if (deltaY < -50) {
            setIsMinimized(false);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleDragHandleClick = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={styles.container}>
            {/* Google Map を背景として配置 */}
            <div className={styles.mapBackground}>
                <MapView locations={mapLocations} center={mapCenter} />
            </div>
            
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={handleBack}>
                    <img src={images.arrowBackBlack}  alt="戻る" />
                </button>
                <h1>目的地の設定</h1>
            </div>
                        
            <div
                ref={listWrapRef}
                className={`${styles.locationListWrap} ${isMinimized ? styles.minimized : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className={styles.dragHandle} onClick={handleDragHandleClick}>
                    <div className={styles.dragLine}></div>
                </div>
                <h2>
                    開始場所近くの{formData.genre || 'ご飯系'}スポット<span>{locations.length}</span>件
                </h2>
                {isLoading ? (
                    <div className={styles.loading}>
                        <p>クエストデータを読み込み中...</p>
                    </div>
                ) : (
                    <ul>
                        {locations.map((location, index) => (
                            <li 
                                key={index}
                                className={styles.locationItem}
                                onClick={() => handleLocationClick(location)}
                            >
                                <h3>{location.name}</h3>
                                <div className={styles.locationText}>
                                    <p className={styles.access}>{location.address}</p>
                                    <p className={styles.openTime}>{location.openTime}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            <LocationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                location={selectedLocation}
                onSelectLocation={handleSelectLocation}
                onStartQuest={handleStartQuest}
            />
        </div>
    );
}