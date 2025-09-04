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

    const handleClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("トークンがありません。ログインしてください。");
                return;
            }

            const body = {
                user_name: userName,
                user_id: userId,
                gender: Number(userGender),
                birthday: userBirthday,
            };

            const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/user/signup`;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("ユーザー登録成功:", data);
                navigate("/friend_add");
            } else {
                alert(`エラー: ${data.message || "登録に失敗しました"}`);
            }

        } catch (error) {
            console.log("ユーザー登録エラー", error)
        }
    }




    return (
        <>

            <p className={styles.setup_text}>名前とIDを設定してください</p>

            <div className={styles.image_placeholder}>
                <img src={images.faceOnly} alt="ロゴ" />
            </div>

            <div className={styles.form_container}>
                <input
                    className={styles.input_form}
                    type="text"
                    placeholder="名前"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    className={styles.input_form}
                    type="text"
                    placeholder="ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
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
                <input
                    className={styles.input_form}
                    type="text"
                    placeholder="誕生日  例:2000-01-20"
                    value={userBirthday}
                    onChange={(e) => setUserBirthday(e.target.value)}
                    required
                />
            </div>

            <div className={styles.user_button}>
                <Button variant="buttonUserLogin" onClick={handleClick}>登録</Button>
            </div>
        </>
    );
};
