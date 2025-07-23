//クエストクリア画面
//ダイアログでポイント表示
//import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from "../styles/quest_clear.module.scss";
import { useNavigate } from 'react-router-dom';
import images from "../hooks/images";


export default function QuestClear() {

    const [isClear, setIsClear] = useState(false);      //テキスト変化
    const [progress, setProgress] = useState(0);        //ゲージ
    const [isAnimated, setIsAnimated] = useState(false); // アニメーションONかどうか
    const [isFading, setIsFading] = useState(false);       //フェードアウト用
    const navigate = useNavigate();

    useEffect(() => {

        //(擬似)バックエンドからゲージの値を取得する
        // 実際は fetch や axios など使う
        const feachProgress = async () => {
            // ここでAPIから値を取得したと仮定（例：70）
            const response = 70;
            setProgress(response);
            setIsAnimated(false); //アニメーションOFF
        }

        const timer = setTimeout(() => {
            setIsClear(true); // 3秒後にtrueにする
            setProgress(100);
            setIsAnimated(true); //アニメーションON
        }, 10000);



        feachProgress();
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const fadeStartTimer = setTimeout(() => {
                setIsFading(true); //ここでフェード開始

                setTimeout(() => {
                    navigate("/chara_evolution");     //進化ゲージが100になったら画面遷移
                }, 2000);

            }, 3000);

            return () => clearTimeout(fadeStartTimer);
        }
    }, [progress, navigate]);


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
                                        <p>
                                            <span className={styles.text_accent}>20</span>
                                            ポイントゲット！
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>るいが</p>
                                    <p>クエスト達成するまで待っててね</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        {/* <img src={images.characterUpHands} alt="キャラクター手を下げている状態" /> */}
                        <img src={images.characterEgg} className={styles.poyooon} alt="たまご" />
                    </div>

                    {/*進化ゲージ*/}

                    <div className={styles.bar_evolution}>
                        <div className={`${styles.barFill} ${isAnimated ? styles.animated : ""}`} style={{ width: `${progress}%` }}>
                            <span className={styles.gauge_text}>{progress}/100</span>
                        </div>
                    </div>

                    {/* フェードアウト用オーバーレイ */}
                    <div className={`${styles.fadeOverlay} ${isFading ? styles.show : ""}`} />



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
