//クエスト進行中画面
//ローディング

import "../styles/quest_playing.scss";
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import images from '../hooks/images';

export default function QuestPlaying() {

    const navigate = useNavigate();

    //遷移：クエストクリア
    const goToHome = () => {
        navigate('/quest_clear');
    };

    return (
        <>
            {/*背景画像*/}
            <div className="backImage">

                {/*クエスト生成画面に戻る*/}
                <div className="top-element">
                    <img className="arrow-back" onClick={goToHome} src={images.arrowBack} alt="クエスト生成画面に戻る" />
                    <p className="text-quest">クエスト進行中...</p>
                </div>

                {/*吹き出し*/}
                <div className="fukidashi">
                    <div className="speechBubble">カフェに行こう</div>
                </div>

                {/*キャラクター*/}
                <div className="image-placeholder">
                    <img src={images.characterLowHands} alt="キャラクター手を下げている状態" />
                </div>

                {/*クエストクリアorクエスト失敗に遷移*/}
                <div className="button-arrangement">
                    <Button variant="small" onClick={goToHome} >到着!</Button>
                </div>


            </div>


        </>
    )
}

