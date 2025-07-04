//import { useNavigate } from 'react-router-dom';
import images from "../hooks/images";

export default function  Login() {
     const handleGoogleLogin = async () => {
        // window.location.href = "http://localhost:18080/auth/google";

        try {
            const res = await fetch("http://localhost:18080/auth/google");
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("認証URLが見つかりません");
            }
        } catch (error) {
            console.error("認証取得エラー:", error);
      }
    };
  

    return (
        <>
            <button onClick={handleGoogleLogin}>
                <img src={images.GoogleButton} alt="Google認証" />
            </button>
        </>
    );
};
