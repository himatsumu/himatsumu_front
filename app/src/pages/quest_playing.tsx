//クエスト進行中画面
//ローディング

import "../styles/quest_playing.scss";
import images from '../hooks/images';

export default function QuestPlaying() {
    return(
        <>
        <button className="font-color">戻る</button>

        <p className="font-color">クエスト挑戦中！！</p>
   
        {/* <img 
                src={images.butonnBackGround} 
                alt="クエスト完了ボタン" 
                onClick={() => {
                    //ボタンクリック時の処理書く
                }}
            /> */}
        

        <div className="image-placeholder">キャラクター画像</div>
 

        <input 
            type="image" 
            src={images.butonnBackGround} 
            alt="クエスト完了ボタン"
            onClick={() => {
                //ボタンクリック時の処理書く
            }}
        />    
        
    
    </>
)
}

