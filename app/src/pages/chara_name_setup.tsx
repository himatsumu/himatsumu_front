//フレンドになったよ
//名前をつけよう
//キャラ名設定
import images from "../hooks/images";
import styles from "../styles/chara_name_setup.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';


export default function CharaNameSetup() {
    const [startText, setStartText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartText(true);
            return () => clearTimeout(timer);
        }, 3000)
    })

    return (
        <>
            {startText ? (
                <div>
                    <div className={styles.top_text}>
                        <p>あやかと育てる</p>
                        <p>このキャラクターに</p>
                        <p>名前をつけよう！</p>
                    </div>
                </div>
            ) : (
                <div className={styles.top_text}>
                    <p>あやかと</p>
                    <p>フレンドになったよ！</p>
                </div>
            )}

            <div className={styles.image_box}>
                <img src={images.characterEgg} alt="キャラクター画像" />
            </div>

            {startText ? (
                <div>
                    <div className={styles.button_box}>
                        <Button variant="buttonCreate">名前をつける</Button>
                    </div >
                </div>
            ) : (
                <></>
            )
            }
        </>
    );
};
