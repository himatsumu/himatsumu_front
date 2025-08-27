//ログイン画面
//import { useNavigate } from 'react-router-dom';
import images from "../hooks/images";
import styles from "../styles/login.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { feFuncA } from "framer-motion/client";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    //JWTを使ってユーザー登録状況をチェック
    const checkUser = async (token: string) => {
        try {
            const response = await fetch("http://localhost:8888/auth/user/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log("ユーザー情報確認:", data);

            if (data.Data?.IsFind) {
                //アプリに登録済み → ホームへ
                navigate("/friend-list");
            } else {
                //未登録 → ユーザー初期設定へ
                navigate("/user_setup");
            }

        } catch (error) {
            console.log("ユーザ確認エラー", error)
        }
    }

    //Googleログイン後にtokenを取得
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
                    navigate("/user_setup");
                } else {
                    console.error("トークンが含まれてないよ");
                }
            } catch (err) {
                console.error("トークン取得失敗", err);
            }
        };
        fetchToken();
    }, [location]);

    //メールとパスワードでログイン
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:18080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                console.log(data)
                localStorage.setItem("token", data.token);
                await checkUser(data.token);
                //ここで画面遷移させたり、UUIDを保存したり
                navigate("/user_setup")
            } else {
                alert(`エラー: ${data.error || data.message || "登録に失敗しました"}`);
            }

        } catch (error) {
            console.error("ログインエラー:", error);
        }
    }

    //Googleログイン
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:18080/auth/google";

        //     //     try {
        //     //         const res = await fetch("http://localhost:18080/auth/google");
        //     //         const data = await res.json();

        //     //         if (data.url) {
        //     //             window.location.href = data.url;
        //     //         } else {
        //     //             console.error("認証URLが見つかりません");
        //     //         }
        //     //     } catch (error) {
        //     //         console.error("認証取得エラー:", error);
        //     //     }

    };


    return (
        <>
            <div className={styles.image_placeholder}>
                <img src={images.faceOnly} alt="ロゴ入れる" />
            </div>

            <div className={styles.form_container}>
                <input
                    className={styles.email_form}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.pass_form}
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>


            <div className={styles.button_container}>
                <Button variant="buttonLogin" className={styles.login_button} onClick={handleLogin}>ログイン</Button>
                <p className={styles.form_divider}>または</p>
                <button onClick={handleGoogleLogin} className={styles.google_button}>
                    <img src={images.GoogleButton} alt="Google認証" />
                </button>
            </div>




        </>
    );
};
