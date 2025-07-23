//import { useNavigate } from 'react-router-dom';
import images from "../hooks/images";
import styles from "../styles/login.module.scss";
import { Button } from '../components/Button';

export default function Login() {
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
        <div>
            <img src={images.faceOnly} alt="ロゴ入れる" />
        </div>

            <div className={styles.form_container}>
                <input className={styles.email_form} type="email" name="email" id="email" placeholder="メールアドレス" required />
                <input className={styles.pass_form} type="password" name="pass" id="pass" placeholder="パスワード" required />
            </div>


            <Button variant="small">ログイン</Button>
            <p>または</p>
            <button onClick={handleGoogleLogin} className={styles.google_button}>
                <img src={images.GoogleButton} alt="Google認証" />
            </button>




        </>
    );
};
