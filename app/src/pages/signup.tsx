//サインアップ画面
import images from "../hooks/images";
import styles from "../styles/login.module.scss";
import { Button } from '../components/Button';
import { useState } from "react";
//import { useEffect, useState } from "react";
//import { useNavigate, useLocation } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:18080/auth/register", {
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

            if (response.ok) {
                console.log(data)
                // ここで画面遷移させたり、UUIDを保存したり
            } else {
                alert(`エラー: ${data.error || data.message || "登録に失敗しました"}`);
            }

        } catch (error) {
            console.error("サインアップエラー:", error);
            alert("サーバーに接続できませんでした");
        }
    }

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
                <Button variant="buttonLogin" className={styles.login_button} onClick={handleSignup}>登録</Button>
                <p className={styles.form_divider}>または</p>
                <button className={styles.google_button}>
                    <img src={images.GoogleButtonSU} alt="Google認証サインアップ" />
                </button>
            </div>

        </>
    );
};
