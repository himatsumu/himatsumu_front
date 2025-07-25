import { Button } from "../components/Button";
import styles from "../styles/quest_theme.module.scss";
import images from "../hooks/images";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Quest_theme() {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state || {};
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/quest-create-check', { state: formData });
    };

    const handleNextClick = async () => {
        setIsLoading(true);
        
        try {
            // localStorageからトークンを取得
            const token = localStorage.getItem('token');
            console.log('localStorage token:', token);
            
            if (!token) {
                console.error('トークンが見つかりません');
                throw new Error('認証トークンが見つかりません');
            }
            
            // APIリクエストの送信
            const requestBody = {
                "schedule": "映画",
                "end_time": "21:00",
                "start_prace": "梅田",
                "budget": 5000,
                "genre": "ご飯系"
            };

            const response = await fetch('http://localhost:8888/auth/quest/quests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const responseData = await response.json();
            console.log('APIレスポンス', responseData);
            
            // レスポンスの店舗データを安全に取得
            const stores = responseData?.Data?.data?.stores || [];
            console.log('店舗データ', stores);
            
            // レスポンスの店舗データを quest_location に渡す
            navigate('/quest-location', { 
                state: { 
                    ...formData,
                    apiStores: stores 
                } 
            });
        } catch (error) {
            console.error('API request error:', error);
            // エラーが発生した場合も遷移（既存のダミーデータを使用）
            navigate('/quest-location', { state: formData });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={handleBack}>
                    <img src={images.arrowBackBlack} alt="戻るボタン" />
                </button>
            </div>
            <div className={styles.speechBubble}>
                <p className={styles.speechBubbleText}>次に目的地を選ぼう!</p>
            </div>
            <div className={styles.characterWrap}>
                <img src={images.characterEgg} alt="手をおろしているキャラクター"  />
            </div>
            <Button className={styles.nextBtn} variant="small" onClick={handleNextClick} disabled={isLoading}>
                {isLoading ? '検索中...' : '目的地を選択する'}
            </Button>
        </div>
    );
}