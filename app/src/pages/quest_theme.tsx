import { Button } from "../components/Button";
import styles from "../styles/quest_theme.module.scss";
import images from "../hooks/images";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Quest_theme() {
    const navigate = useNavigate();
    const location = useLocation();
    const formData = location.state || {};

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/quest-create-check', { state: formData });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={handleBack}>
                    <img src={images.arrowBackBlack} alt="戻るボタン" />
                </button>
            </div>
            <div className={styles.speechBubble}>
                <p className={styles.speechBubbleText}>
                    今回のクエストは...
                </p>
                <p className={styles.themeText}>
                    <span>カフェ</span>だよ
                </p>
            </div>
            <div className={styles.characterWrap}>
                <img src={images.characterLowHands} alt="手をおろしているキャラクター"  />
            </div>
            <Button className={styles.nextBtn} variant="small">目的地を選択する</Button>
        </div>
    );
}