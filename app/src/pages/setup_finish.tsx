//キャラクター・ユーザー情報入力完了画面
import images from "../hooks/images";
import styles from "../styles/setup_finish.module.scss";
import { Button } from '../components/Button';
//import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function SetupFinish() {
    const navigate = useNavigate();

    const handleFriendList = (() => {
        navigate("/friend-list")
    })

    const location = useLocation();
    const name = location.state?.name || "";

    return(
        <>
        <div className={styles.top_text}>
            <p>あやかと{name}と</p>
            <p>一緒に空き時間を</p>
            <p>これから楽しもう！</p>
        </div>

        <div className={styles.image_box}>
            <img src={images.characterEgg} alt="キャラクター画像" />
            <p className={styles.chara_name}>{name}</p>
        </div>

            <div className={styles.button_box} onClick={handleFriendList}>
                <Button variant="buttonUserLogin">始める</Button>
        </div>
        </>
    );
};
