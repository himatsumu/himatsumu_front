//キャラクター進化画面
import { useEffect, useState } from "react";
import styles from "../styles/chara_evolution.module.scss";
import images from "../hooks/images";
import { Button } from "../components/Button";
import { useNavigate } from 'react-router-dom';

export default function CharaEvolution() {
    const eggs = [images.egg1, images.egg2, images.egg3, images.egg4];  //卵の画像（表示順番も管理）
    const [eggIndex, setEggIndex] = useState(0);                        //現在表示している卵のインデックスを保存（初期は０）
    const [bgAnimate, setBgAnimate] = useState(false);                  //アニメーションのタイミング制御
    const [text, setText] = useState(false);                            //テキストの表示変更タイミング制御
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();


    //卵切り替え処理
    useEffect(() => {
        // 最後の画像まできたら止める
        if (eggIndex < eggs.length - 1) {               //egg4じゃない時だけ処理実行
            const timer = setTimeout(() => {
                setEggIndex((prev) => prev + 1);        //setEggIndex(eggIndex + 1);ではない理由→非同期ですぐ対応されるとは限らないから　prevは前の状態、prev + 1前の状態に1を足す
            }, 800); // 0.8秒たったらeggIndexに１増やす
            return () => clearTimeout(timer);           //前回のsettimeoutをキャンセルして二重実行を防ぐ
        }
    }, [eggIndex]);     //eggIndexが変わった時だけuseEffect動かすよ

    
    useEffect(() => {
        // 3秒後にアニメーションを開始
        const timer = setTimeout(() => setBgAnimate(true), 3000);   //背景を3秒後にかえる
        setTimeout(() => setText(true), 3500);                      //テキストを3.5秒後に変える
        setTimeout(() => { setIsModalOpen(true); }, 7000);
        return () => clearTimeout(timer);
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/friend-home');
      };

    const goToQuest = () => {
        navigate('/quest-create');
    }


    return (
        <>
            <div className={styles.wrapper}>
                <div className={`${styles.backImage} ${bgAnimate ? styles.animateBg : ""}`} />
                <div className={styles.content}>
                    <div className={styles.evolution_text}>
                        {text ? (
                            <>
                                <p>ももが</p>
                                <p>レベルアップしたよ！</p>
                            </>
                        ) : (

                            <>
                                <p>ももが</p>
                                <p>進化しそう...</p>
                            </>
                        )}

                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.radialCircle} alt="放射状の背景" className={`${styles.adial_circle} ${styles.expansion} `} />
                        <img
                            src={eggs[eggIndex]}
                            alt={`キャラクターたまご${eggIndex + 1}`}
                            className={`${styles.character_egg} ${styles.shake}`}   //後で振動させるcss書く
                        />
                    </div>


                    {/*ダイアログ */}
                    {isModalOpen && (
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalContent}>
                                <div className={styles.dialogIntext}>
                                    <p>引き続きクエストに挑戦する？</p>
                                    <p>それとも今日は終了？</p>
                                </div>
                                <div className={styles.btnWrap}>            
                                    <Button variant="common" className={styles.questBtn} onClick={handleCloseModal}>今日は終了</Button>
                                    <Button variant="common" className={styles.selectBtn} onClick={goToQuest}>続ける </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>


        </>
    );
};
