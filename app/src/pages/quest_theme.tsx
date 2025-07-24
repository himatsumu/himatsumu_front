import { Button } from "../components/Button";
import styles from "../styles/quest_theme.module.scss";
import images from "../hooks/images";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface FormData {
    plan: string;
    endTime: string;
    startLocation: string;
    budget: number;
    genre: string;
}

export default function Quest_theme() {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state as FormData || {};
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/quest-create-check', { state: formData });
    };

    const handleNextClick = async () => {
        setIsLoading(true);
        
        try {
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

            const apiResponse = await response.json();
            
            // API レスポンスを quest_location に渡す
            navigate('/quest-location', { 
                state: { 
                    ...formData,
                    questData: apiResponse 
                } 
            });
        } catch (error) {
            console.error('API fetch error:', error);
            // エラー時はformDataのみで遷移
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
                <img src={images.characterEgg} alt="手をおろしているキャラクター" />
            </div>
            <Button 
                className={styles.nextBtn} 
                variant="small" 
                onClick={handleNextClick}
                disabled={isLoading}
            >
                {isLoading ? 'データ取得中...' : '目的地を選択する'}
            </Button>
        </div>
    );
}
