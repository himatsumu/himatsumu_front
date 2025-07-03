//キャラクター進化画面
import { useEffect, useState } from "react";
import styles from "../styles/chara_evolution.module.scss";
import images from "../hooks/images";

export default function CharaEvolution() {
    const eggs = [images.egg1, images.egg2, images.egg3, images.egg4];  //卵の画像（表示順番も管理）
    const [eggIndex, setEggIndex] = useState(0);                        //現在表示している卵のインデックスを保存（初期は０）

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


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.backImage} />
                <div className={styles.content}>
                    <div className={styles.evolution_text}>
                        <p>キャラクター名が</p>
                        <p>進化しそう...</p>
                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.radialCircle} alt="放射状の背景" className={styles.adial_circle} />
                        <img
                            src={eggs[eggIndex]}    
                            alt={`キャラクターたまご${eggIndex + 1}`}
                            className={`${styles.character_egg} ${styles.shake}`}   //後で振動させるcss書く
                        />
                    </div>
                </div>

            </div>


        </>
    );
};
