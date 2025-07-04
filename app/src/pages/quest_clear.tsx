//クエストクリア画面
//ダイアログでポイント表示
//import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from "react";
import styles from "../styles/quest_clear.module.scss";
import { useNavigate } from 'react-router-dom';
import images from "../hooks/images";

export default function QuestClear() {

    const [isClear, setIsClear] = useState(false);      //テキスト変化
    const [progress, setProgress] = useState(0);        //ゲージ
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClear(true); // 3秒後にtrueにする
        }, 5000);

        //(擬似)バックエンドからゲージの値を取得する
        // 実際は fetch や axios など使う
        const feachProgress = async () => {
            // ここでAPIから値を取得したと仮定（例：70）
            const response = 70;
            setProgress(response);
        }

        feachProgress();
        return () => clearTimeout(timer); 
    }, []);

    
    
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.backGra} />
                <div className={styles.content}>
                    <div className={styles.top_element}>
                        <div className={styles.anime}>
                            <img src={images.questClear} alt="クエスト達成" className={styles.quest_success} />
                        </div>
                        <div className={styles.clear_text}>
                            {isClear ? (
                                <>
                                    <div className={styles.text_side}>
                                        <img src={images.coin} alt="コイン" />
                                        <p>20ポイントゲット！</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>（相手の名前）が</p>
                                    <p>クエスト達成するまで待っててね</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.characterUpHands} alt="キャラクター手を下げている状態" />
                    </div>

                    {/*進化ゲージ*/}
                    <div className={styles.bar_evolution}>
                        <div style={{ width: `${progress}%` }}>72/100</div>   
                    </div>




                    {/* <button type="button" onClick={handleShowModal}>ダイアログおーぷん〜</button>

                    ダイアログ
                    <dialog ref={dialogRef} className="quest-dialog">
                        <div className="dialog-intext">
                            <h1>クエスト続ける？</h1>
                        </div>
                        <button type="button">続ける</button>
                        <button type="button" onClick={handleCloseModal}>今日は終了</button>

                    </dialog> */}
                </div>
            </div>

        </>
    );
};
