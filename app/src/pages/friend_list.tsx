import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import images from "../hooks/images";
import styles from "../styles/friend_list.module.scss";

// フレンドデータの型定義
interface Friend {
    FriendUuid: string;
    FriendUserUuid: string;
    FriendName: string;
    FaceImg: string;
}

// APIレスポンスの型定義
interface FriendsApiResponse {
    Message: string;
    Status: number;
    Data: Friend[];
}

export default function Friend_list() {
    const navigate = useNavigate();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const handleNext = () => {
        navigate('/friend-home');
    }

    // フレンド一覧を取得する関数
    const fetchFriends = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            // localStorageからJWTトークンを取得
            const token = localStorage.getItem('token');
            console.log('取得したトークン:', token ? 'トークンあり' : 'トークンなし');
            
            if (!token) {
                throw new Error('認証トークンが見つかりません');
            }

            const go_port = import.meta.env.VITE_GO_PORT;
            const apiUrl = `http://localhost:${go_port}/auth/friend/`;
            console.log('APIリクエスト開始:', apiUrl);
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('APIレスポンス:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data: FriendsApiResponse = await response.json();
            console.log('取得したAPIデータ:', data);
            
            if (data.Status === 200) {
                console.log('フレンドデータ:', data.Data);
                console.log('フレンド数:', data.Data?.length || 0);
                setFriends(data.Data || []);
            } else {
                console.error('APIエラー:', data.Message);
                throw new Error(data.Message || 'フレンド一覧の取得に失敗しました');
            }
        } catch (err) {
            console.error('フレンド一覧取得エラー:', err);
            console.error('エラーの詳細:', {
                message: err instanceof Error ? err.message : 'Unknown error',
                type: typeof err,
                stack: err instanceof Error ? err.stack : undefined
            });
            setError(err instanceof Error ? err.message : 'フレンド一覧の取得に失敗しました');
        } finally {
            setIsLoading(false);
            console.log('フレンド取得処理完了');
        }
    };

    // コンポーネントマウント時にフレンド一覧を取得
    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>フレンド一覧</h1>
                <button>
                    <img src={images.friendAdd} alt="フレンド追加ボタン" />
                </button>
            </div>
            
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <p>読み込み中...</p>
                </div>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <p>エラー: {error}</p>
                    <button onClick={fetchFriends}>再試行</button>
                </div>
            ) : (
                <ul className={styles.friendList}>
                    {friends.length > 0 ? (
                        friends.map((friend) => (
                            <li key={friend.FriendUuid} onClick={handleNext}>
                                <p>{friend.FriendName}</p>
                                <img 
                                    src={friend.FaceImg || images.faceOnly} 
                                    alt={`${friend.FriendName}のキャラクター`} 
                                />
                            </li>
                        ))
                    ) : (
                        <li onClick={handleNext}>
                            <p>るい</p>
                            <img src={images.faceOnly} alt="顔だけのキャラクター" />
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}