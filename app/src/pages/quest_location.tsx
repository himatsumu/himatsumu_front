import { useState, useRef, useMemo } from 'react';
import styles from "../styles/quest_location.module.scss"
import LocationModal from "../components/LocationModal";
import MapView from "../components/MapView";
import type { MapLocation } from "../components/MapView";
import images from "../hooks/images";
import { useNavigate } from 'react-router-dom';

interface LocationData {
    name: string;
    address: string;
    openTime: string;
    lat: number;
    lng: number;
}

export default function Quest_location() {
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const listWrapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const locations: LocationData[] = [
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

    // マップ用のデータを作成（無限ループを避けるためuseMemoを使用）
    const mapLocations: MapLocation[] = useMemo(() => {
        // TOHOシネマズ梅田本館を追加（特別なマーカーとして設定）
        const tohoLocation: MapLocation = {
            name: "TOHOシネマズ 梅田 本館",
            lat: 34.70278,
            lng: 135.49744,
            isSpecial: true, // 青いマーカーにするためのフラグ
            address: "大阪府大阪市北区梅田1丁目12-6 E-MA 6F-7F",
            openTime: "9:00~23:00"
        };
        
        // レストランの位置情報とTOHOシネマズを合わせて返す
        return [
            tohoLocation,
            ...locations.map(loc => ({
                name: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                address: loc.address,
                openTime: loc.openTime
            }))
        ];
    }, []);

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