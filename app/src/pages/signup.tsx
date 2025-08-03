//サインアップ画面
import images from "../hooks/images";
import styles from "../styles/login.module.scss";
import { Button } from '../components/Button';
//import { useEffect, useState } from "react";
//import { useNavigate, useLocation } from 'react-router-dom';

export default function Signup() {
    return (
        <>
            <div className={styles.image_placeholder}>
                <img src={images.faceOnly} alt="ロゴ入れる" />
            </div>

            <div className={styles.form_container}>
                <input className={styles.email_form} type="email" name="email" id="email" placeholder="メールアドレス" required />
                <input className={styles.pass_form} type="password" name="pass" id="pass" placeholder="パスワード" required />
            </div>


            <div className={styles.button_container}>
                <Button variant="buttonLogin" className={styles.login_button}>ログイン</Button>
                <p className={styles.form_divider}>または</p>
                <button className={styles.google_button}>
                    <img src={images.GoogleButtonSU} alt="Google認証サインアップ" />
                </button>
            </div>

        </>
    );
};
