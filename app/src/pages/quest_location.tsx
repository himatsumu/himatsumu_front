import { useState, useRef, useMemo } from 'react';
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

// APIレスポンスの型定義
interface ApiStore {
    store_name?: string;
    store_address?: string;
    start_hours?: string;
    end_hours?: string;
    location?: {
        lat: number;
        lng: number;
    };
    reviews?: string[];
    types?: string[];
}

export default function Quest_location() {
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const listWrapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state || {};

    // APIから取得した店舗データがあればそれを使用、なければダミーデータを使用
    const locations: LocationData[] = useMemo(() => {
        // APIから取得したデータの存在確認と配列チェック
        if (formData.apiStores && Array.isArray(formData.apiStores) && formData.apiStores.length > 0) {
            console.log('APIデータを使用:', formData.apiStores);
            return formData.apiStores.map((store: ApiStore) => ({
                name: store.store_name || 'Unknown Store',
                address: store.store_address || '',
                openTime: store.start_hours && store.end_hours ? `${store.start_hours}~${store.end_hours}` : '時間不明',
                lat: store.location?.lat || 34.7035,
                lng: store.location?.lng || 135.4992,
                reviews: store.reviews || [],
                types: store.types || []
            }));
        }
        
        console.log('ダミーデータを使用');
        // ダミーデータ（APIデータがない場合）
        return [
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
        ];
    }, [formData.apiStores]);

    // マップ用のデータを作成（無限ループを避けるためuseMemoを使用）
    const mapLocations: MapLocation[] = useMemo(() => {
        // デバッグ用ログ
        console.log('formData:', formData);
        console.log('formData.start_location:', formData.start_location);
        console.log('formData.start_location_name:', formData.start_location_name);
        console.log('formData.start_location_address:', formData.start_location_address);
        
        // 開始場所の情報をformDataから取得
        const startLocation: MapLocation = {
            name: formData.start_location_name || "開始場所",
            lat: formData.start_location?.lat || 34.70278, // ユニバーサル・スタジオ・ジャパンの座標
            lng: formData.start_location?.lng || 135.49744, // ユニバーサル・スタジオ・ジャパンの座標
            isSpecial: true, // 青いマーカーにするためのフラグ
            address: formData.start_location_address || ""
        };
        
        console.log('使用される開始場所:', startLocation);
        
        // レストランの位置情報と開始場所を合わせて返す
        return [
            startLocation,
            ...locations.map(loc => ({
                name: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                address: loc.address,
                openTime: loc.openTime
            }))
        ];
    }, [locations, formData.start_location_name, formData.start_location, formData.start_location_address]);

    const mapCenter = useMemo(() => {
        const center = {
            lat: formData.start_location?.lat || 34.70278,
            lng: formData.start_location?.lng || 135.49744,
        };
        console.log('マップセンター:', center);
        return center;
    }, [formData.start_location]);

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

    const handleStartQuest = async () => {
        // クエスト開始のロジック - 選択された店舗情報をAPIに送信
        if (!selectedLocation) {
            return;
        }

        try {
            // localStorageからトークンを取得
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('トークンが見つかりません');
                throw new Error('認証トークンが見つかりません');
            }

            // friend_uuidを取得（formDataから取得するか、別途設定する必要があります）
            // TODO: 実際のfriend_uuidの取得方法に応じて修正してください
            const friendUuid = formData.friend_uuid || "f111-2222-1111-2222-222222222222";

            // APIリクエストボディを作成
            const requestBody = {
                friend_uuid: friendUuid,
                store_name: selectedLocation.name,
                store_address: selectedLocation.address,
                types: selectedLocation.types || ["restaurant", "food", "point_of_interest", "establishment"],
                reviews: selectedLocation.reviews || [],
                store_place: {
                    lat: selectedLocation.lat,
                    lon: selectedLocation.lng
                }
            };

            const go_port = import.meta.env.VITE_GO_PORT;

            const response = await fetch(`http://localhost:${go_port}/auth/quest/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API request failed:', errorData);
                throw new Error(errorData.Message || 'API request failed');
            }

            const responseData = await response.json();
            console.log('クエスト作成APIレスポンス:', responseData);

            // 成功時は quest_playing に遷移
            navigate('/quest_playing', { 
                state: { 
                    selectedStore: selectedLocation,
                    questUuid: responseData?.Data?.quest_uuid
                } 
            });
        } catch (error) {
            console.error('Quest creation error:', error);
            // エラーが発生した場合もquest_playingに遷移（既存の動作を保持）
            navigate('/quest_playing', { 
                state: { 
                    selectedStore: selectedLocation 
                } 
            });
        }
        
        handleCloseModal();
    };

    const handleBack = () => {
        navigate('/quest-theme');
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
                    開始場所近くのご飯系スポット<span>{locations.length}</span>件
                </h2>
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