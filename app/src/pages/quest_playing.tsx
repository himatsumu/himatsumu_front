//クエスト進行中画面
//ローディング

import styles from "../styles/quest_playing.module.scss";
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import images from '../hooks/images';

export default function QuestPlaying() {

    const navigate = useNavigate();

    //遷移：クエストクリア
    const goToHome = () => {
        navigate('/quest_clear');
    };

    return (
        <>
            <div className={styles.wrapper}>
                {/*背景画像*/}
                <div className={styles.backImage} />

                <div className={styles.content}>

                    {/*クエスト生成画面に戻る*/}
                    <div className={styles.top_element}>
                        <img className={styles.arrow_back} onClick={goToHome} src={images.arrowBack} alt="クエスト生成画面に戻る" />
                        <p className={styles.text_quest}>クエスト進行中...</p>
                    </div>

                    {/*吹き出し*/}
                    <div className={styles.fukidashi}>
                        <div className={styles.speechBubble}>カフェに行こう</div>
                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.characterLowHands} alt="キャラクター手を下げている状態" />
                    </div>

                    {/*クエストクリアorクエスト失敗に遷移*/}
                    <div className={styles.button_arrangement}>
                        <Button variant="small" onClick={goToHome} >到着!</Button>
                    </div>

                </div>

            </div>


        </>
    )
}

