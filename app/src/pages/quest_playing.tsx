//クエスト進行中画面
//ローディング

import "../styles/quest_playing.scss";
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
// import images from '../hooks/images';

export default function QuestPlaying() {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/quest_clear');
    };

    return (
        <>
            <button className="back-button">戻る</button>

            <p className="text-quest">クエスト進行中...</p>

            <div className="speechBubble">吹き出し</div>

            <div className="image-placeholder">キャラクター画像</div>

            <Button variant= "small" onClick={goToHome} >到着</Button>




            {/* <input 
            type="image" 
            src={images.butonnBackGround} 
            alt="クエスト完了ボタン"
            onClick={() => {
                //ボタンクリック時の処理書く
            }}
        />     */}


        </>
    )
}

