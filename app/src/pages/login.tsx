import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Routerを使っている場合
import images from "../hooks/images";

export default function Login() {
    const navigate = useNavigate(); // ページ遷移のために必要

    // Googleログインボタンが押されたときの処理
    const handleGoogleLogin = () => {
        // バックエンドの認証エンドポイントにリダイレクト
        window.location.href = "http://localhost:18080/auth/google";
    };

    // このコンポーネントが読み込まれたときに一度だけ実行される
    useEffect(() => {
        // すでにトークンがあるかチェック
        const existingToken = localStorage.getItem('jwt_token');
        if (existingToken) {
            console.log("すでにログイン済みです。");
            navigate('/'); //ホームに移動
            return;
        }

        // /api/tokenエンドポイントにリクエストを送信
        fetch('http://localhost:18080/auth/user/', {
            credentials: 'include'
        })
        .then(res => {
            // ステータスコードが200番台でなければエラーとして処理
            if (!res.ok) {
                // ユーザーはログイン画面に留まる
                throw new Error('No active session or failed to fetch token.');
            }
            return res.json();
        })
        .then(data => {
            // レスポンスにトークンが含まれていたら
            if (data.token) {
                console.log('トークンを取得しました:', data.token);
                // トークンをローカルストレージに保存
                localStorage.setItem('jwt_token', data.token);
                
                // ログイン後のページ（例: /dashboard）に遷移
                navigate('/'); 
            }
        })
        .catch(error => {
            // fetchが失敗した場合（ネットワークエラーやセッションがない場合など）
            // ユーザーはログインしていないので、何もせずログイン画面に留まる
            console.log('トークンの取得は不要か、失敗しました:', error.message);
        });
    }, [navigate]); // navigateが変更されたときに再実行（通常は初回のみ）

    return (
        <>
            <p>Googleアカウントでログイン</p>
            <button onClick={handleGoogleLogin}>
                <img src={images.GoogleButton} alt="Google認証" />
            </button>
        </>
    );
};