//申請リクエスト
import images from "../hooks/images";
import styles from "../styles/friend_apply.module.scss";
import { Button } from '../components/Button';
import FriendCard from '../components/FriendCard';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function FriendApply() {

    type FriendRequest = {
        ReqID: string;
        SenderId: string;
        ReceverId: string;
        SenderName: string;
        ReqTime: string;
    };

    const navigate = useNavigate();
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    console.log("トークンがありません")
                    alert("トークンがありません。ログインしてください")
                    return;
                }
                const userId = localStorage.getItem("userId");

                const response = await fetch(`http://localhost:8888/auth/request/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })

                const data = await response.json();
                console.log("リクエスト一覧", data)

                if (response.ok && Array.isArray(data.Data)) {
                    setRequests(data.Data);
                } else {
                    setRequests([]);
                    setError("申請がありません");
                }

            } catch (error) {
                console.log("リクエストの取得に失敗しました", error)
            }

        }
        fetchRequest();
    },[])

    const handleBack = () => {
        navigate("/friend_add")
    }

    return (
        <>
            <div className={styles.header}>
                <button onClick={handleBack}>
                    <img src={images.arrowBackBlack} alt="前の画面に戻る" />
                </button>
                <h1 className={styles.top_text}>申請リクエスト</h1>
            </div>

            <div className={styles.request_list}>
                {requests.length > 0 ? (
                    requests.map((req) => (
                        <FriendCard
                            key={req.ReqID}
                            name={req.SenderName}
                            id={req.SenderId}
                        />
                    ))
                ) : (
                    <p className={styles.error_text}>{error}</p>
                )}
            </div>


        </>
    );
};
