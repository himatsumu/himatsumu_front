import { useState, useRef, useMemo } from 'react';
import styles from "../styles/quest_location.module.scss"
import LocationModal from "../components/LocationModal";
import MapView from "../components/MapView";
import type { MapLocation } from "../components/MapView";
// import { useNavigate } from 'react-router-dom';

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
    // const navigate = useNavigate();

    const locations: LocationData[] = [
        {
            name: "タリーズコーヒー 大阪梅田芝田店",
            address: "大阪府大阪市北区芝田1丁目1-35",
            openTime: "07:30~22:00",
            lat: 34.7024,
            lng: 135.4959
        },
        {
            name: "カフェ バーンホーフ 三番街店",
            address: "大阪府大阪市北区芝田１丁目１−３ 阪急三番街 南館 B2F",
            openTime: "11:00~20:40",
            lat: 34.7020,
            lng: 135.4977
        },
        {
            name: "梅田 阪急三番街 リバーカフェ",
            address: "大阪府大阪市北区芝田１丁目１−３ 阪急三番街南館 地下2階",
            openTime: "11:00~22:30",
            lat: 34.7018,
            lng: 135.4975
        },
        {
            name: "上島珈琲店 阪急三番街店",
            address: "大阪府大阪市北区芝田１丁目１−３ 阪急三番街南館 B1F",
            openTime: "10:00~21:00",
            lat: 34.7022,
            lng: 135.4976
        }
    ];

    // マップ用のデータを作成（無限ループを避けるためuseMemoを使用）
    const mapLocations: MapLocation[] = useMemo(() => 
        locations.map(loc => ({
            name: loc.name,
            lat: loc.lat,
            lng: loc.lng
        })), []);

    const mapCenter = useMemo(() => ({
        lat: 34.7068639, // 中崎町駅の座標
        lng: 135.5052444
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
        // クエスト開始のロジック
        console.log('クエスト開始:', selectedLocation);
        handleCloseModal();
    };

    // const handleBack = () => {
    //     navigate('/quest-theme');
    // };

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
                {/* <button className={styles.backBtn} onClick={handleBack}>
                    <img src={images.arrowBackBlack}  alt="戻る" />
                </button>
                <h1>目的地の設定</h1> */}
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
                    開始場所近くのカフェ<span>{locations.length}</span>件
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