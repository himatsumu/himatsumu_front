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
        id: string;
        name: string;
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
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:8888/auth/user/${searchInput}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data.Data.
                IsFind)
            if (res.data.Data.
                IsFind === undefined) {
                setUserData(res.data.Data);
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
                    />
                )}
                {error && <p className={styles.error_text}>{error}</p>}
            </div>



        </>
    );
};
