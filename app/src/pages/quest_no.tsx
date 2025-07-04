//クエスト未達成画面
import styles from "../styles/quest_no.module.scss";
import images from '../hooks/images';
import { Button } from '../components/Button';
import { useNavigate } from "react-router-dom";

export default function QuestNo() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/')
    }
    return (
        <>
            <div className={styles.no_wrapper}>
                <div className={styles.no_backGra} />
                <div className={styles.no_content}>
                    {/*ここに中身かく*/}
                    <img src={images.questNo} alt="クエスト失敗" className={styles.quest_miss} />
                    <p className={styles.quest_no_text}>目的地まであと50mだよ</p>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.characterCry} alt="キャラクター泣いている" />
                    </div>

                    <div className={styles.button_arrangement}>
                        <Button variant="blueButton" onClick={goToHome}>やり直す</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
