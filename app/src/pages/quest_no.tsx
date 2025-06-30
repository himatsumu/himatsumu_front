//クエスト未達成画面
import "../styles/quest_no.scss";
import images from '../hooks/images';
import { Button } from '../components/Button';

export default function QuestNo() {
    return (
        <>
            <div className="no-wrapper">
                <div className="no-backGra" />
                <div className="no-content">
                    {/*ここに中身かく*/}
                    <img src={images.questNo} alt="クエスト失敗" />
                    <p className="quest-no-text">目的地まであと50mだよ</p>

                    {/*キャラクター*/}
                    <div className="image-placeholder">
                        <img src={images.characterLowHands} alt="キャラクター手を下げている状態" />
                    </div>

                    <Button variant="blueButton">やり直す</Button>

                </div>
            </div>
        </>
    );
};
