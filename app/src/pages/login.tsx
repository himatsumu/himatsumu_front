//ログイン画面
//import { useNavigate } from 'react-router-dom';
import images from "../hooks/images";
import styles from "../styles/login.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); 
    const location = useLocation();


    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await fetch("http://localhost:18080/auth/user/", {
                    credentials: "include", // cookie送るために必要
                });
                const data = await res.json();

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setIsLoggedIn(true);
                    console.log("トークン取得成功！");
                    navigate("/friend-list");
                } else {
                    console.error("トークンが含まれてないよ");
                }
            } catch (err) {
                console.error("トークン取得失敗", err);
            }
        };
        fetchToken();
    }, [location]);


    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:18080/auth/google";

        //     try {
        //         const res = await fetch("http://localhost:18080/auth/google");
        //         const data = await res.json();

        //         if (data.url) {
        //             window.location.href = data.url;
        //         } else {
        //             console.error("認証URLが見つかりません");
        //         }
        //     } catch (error) {
        //         console.error("認証取得エラー:", error);
        //     }

    };


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
                <button onClick={handleGoogleLogin} className={styles.google_button}>
                    <img src={images.GoogleButton} alt="Google認証" />
                </button>
            </div>




        </>
    );
};
