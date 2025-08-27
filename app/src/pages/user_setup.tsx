//ユーザ情報登録画面
import images from "../hooks/images";
import styles from "../styles/user_setup.module.scss";
import { Button } from '../components/Button';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function UserSetup() {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [userGender, setUserGender] = useState("");
    const [userBirthday, setUserBirthday] = useState("");
    const navigate = useNavigate();

    const handleClick = (() => {
        navigate("/friend_add")
    })
    return (
        <>

            <p className={styles.setup_text}>名前とIDを設定してください</p>

            <div className={styles.image_placeholder}>
                <img src={images.faceOnly} alt="ロゴ" />
            </div>

            <div className={styles.form_container}>
                <input className={styles.input_form} type="text" placeholder="名前" required />
                <input className={styles.input_form} type="text" placeholder="ID" required />
                {/* <input className={styles.imput_form} type="text" placeholder="性別" required />   後でセレクトボックスに変更 */}
                <select
                    name="性別"
                    id="gender"
                    className={styles.select_form}
                    value={userGender}
                    onChange={(e) => setUserGender(e.target.value)}
                    required
                >
                    <option value="">性別</option>
                    <option value="0">男</option>
                    <option value="1">女</option>
                    <option value="2">その他</option>
                </select>
                <input className={styles.input_form} type="text" placeholder="誕生日  例:2000-01-20" required />
            </div>

            <div className={styles.user_button}>
                <Button variant="buttonUserLogin" onClick={handleClick}>登録</Button>
            </div>
        </>
    );
};
