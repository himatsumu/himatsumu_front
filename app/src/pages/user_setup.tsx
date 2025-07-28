//ユーザ情報登録画面
import images from "../hooks/images";
import styles from "../styles/user_setup.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserSetup() {
    return (
        <>
        
            <p className={styles.setup_text}>名前とIDを設定してください</p>

            <div className={styles.image_placeholder}>
                <img src={images.faceOnly} alt="ロゴ" />
            </div>

            <div className={styles.form_container}>
                <input className={styles.id_form} type="text" placeholder="ID" required />
                <input className={styles.name_form} type="text" placeholder="名前" required />
                <input className={styles.gender_form} type="text" placeholder="性別" required />   {/*後でセレクトボックスに変更*/}
                <input className={styles.birthday_form} type="text" placeholder="誕生日" required />
            </div>

            <div className={styles.user_button}>
                <Button variant="buttonUserLogin">登録</Button>
            </div>
        </>
    );
};
