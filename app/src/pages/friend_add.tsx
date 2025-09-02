//フレンド追加画面
import images from "../hooks/images";
import styles from "../styles/friend_add.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import FriendCard from "../components/FriendCard";
import axios from "axios";


export default function FriendAdd() {

    type UserData = {
        uuid: string;
        name: string;
        id: string;
    };

    const navigate = useNavigate();

    const handleClick = (() => {
        navigate("/friend_apply")
    })

    const [searchInput, setSearchInput] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState("");



    const handleSearch = async () => {
        console.log("検索ボタン押された！");

        if (searchInput.trim() === "") {
            setUserData(null);
            setError("");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8888/auth/user/${searchInput}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = response.data.Data;
            console.log(response.data)
            if (user && user.uuid) {
                setUserData(user);
                setError("");
            } else {
                setUserData(null);
                setError("ユーザーが見つかりませんでした");
            }

        } catch (err) {
            console.error("検索失敗", err);
            setUserData(null);
            setError("ユーザーが見つかりませんでした");
        }
    };

    const handleSendRequest = async (receiverUuid: string) => {
        try {
            //tokenの確認
            const token = localStorage.getItem("token");
            if (!token) {
                alert("トークンがありません。ログインしてください。");
                return;
            }

            const response = await fetch(`http://localhost:8888/auth/request/send/${receiverUuid}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }
            console.log("フレンド申請成功:", data);
        } catch (error) {
            console.log("申請エラー", error);
        }
    }


    return (
        <>
            <div className={styles.top_element}>
                <img src={images.closeButton} alt="閉じるボタン" />
                <p className={styles.top_text}>フレンド追加</p>
            </div>

            <div className={styles.search_bar}>
                <div className={styles.input_box}>
                    <input type="search"
                        name="search"
                        placeholder="名前 または ユーザーネーム"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} />
                    <button type="button" onClick={handleSearch} className={styles.search_button}>
                        <img src={images.search} alt="検索虫眼鏡" />
                    </button>
                </div>
            </div>

            {userData === null && error === "" && (

                <div className={styles.request_container}>
                    <button className={styles.request_button} onClick={handleClick}>
                        <img src={images.human} alt="人間" />
                        <p className={styles.request_text}>申請リクエスト</p>
                        <img src={images.arrowForward} alt="オレンジ色の次へボタン" />
                    </button>
                </div>

            )}


            <div className={styles.result_area}>
                {userData !== null && (
                    <FriendCard
                        name={userData.name}
                        id={userData.id}
                        onSendRequest={() => handleSendRequest(userData.uuid)}
                    />
                )}
                {error && <p className={styles.error_text}>{error}</p>}
            </div>



        </>
    );
};
