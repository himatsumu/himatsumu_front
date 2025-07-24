//クエスト進行中画面
//ローディング
import { useState } from "react";
import styles from "../styles/quest_playing.module.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import images from '../hooks/images';

interface LocationData {
    name: string;
    address: string;
    openTime: string;
    lat: number;
    lng: number;
}

export default function QuestPlaying() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // quest_locationから渡された店舗情報を取得
    const selectedStore = location.state?.selectedStore as LocationData | undefined;

    const token = localStorage.getItem("token");

    //遷移：クエストクリア
    const goToHome = () => {
        //位置情報用
        const options = {
            enableHighAccuracy: true,
            timeout: 8000,          //位置情報の取得が8秒以内に終わらなかったらエラー
            maximumAge: 0,          //常に最新の位置情報を取得する
        };

        //位置情報取得成功時
        function success(pos: GeolocationPosition) {
            const crd = pos.coords;

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);              // 緯度
            console.log(`Longitude: ${crd.longitude}`);             //経度
            console.log(`More or less ${crd.accuracy} meters.`);    //誤差の範囲

            const body = {
                quest_uuid: "qceccccc-cccc-cccc-cccc-cccccccccccc",
                friend_uuid: "f1111111-2222-1111-2222-222222222222",
                point: {
                    lat: crd.latitude,
                    lon: crd.longitude
                }
            };

            fetch("http://localhost:8888/auth/quest/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("レスポンス:", data);
                    setTimeout(() => {
                        setIsLoading(false);
                        navigate('/quest_clear');
                    }, 4000);
                })
                .catch(err => {
                    console.error("APIエラー:", err);
                    setIsLoading(false);
                });
        }


        //位置情報取得エラー時
        function error(err: GeolocationPositionError) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        //位置情報取得
        navigator.geolocation.getCurrentPosition(success, error, options);

        //ローディング開始
        setIsLoading(true);
    };


    return (
        <>
            <div className={styles.wrapper}>
                {/*背景画像*/}
                <div className={styles.backImage} />

                <div className={styles.content}>

                    {/*クエスト生成画面に戻る*/}
                    <div className={styles.top_element}>
                        <img className={styles.arrow_back} onClick={goToHome} src={images.arrowBack} alt="クエスト生成画面に戻る" />
                        <p className={styles.text_quest}>クエスト進行中...</p>
                    </div>

                    {/*吹き出し*/}
                    <div className={styles.fukidashi}>
                        <div className={styles.speechBubble}>
                            <div className={styles.left_text}>
                                <span className={styles.texxt_accent}>
                                    {selectedStore ? selectedStore.name : 'きりん寺 油そば 梅田店'}
                                </span>
                            </div>
                            <div className={styles.right_text}>
                                <p className={styles.text_arrangement}>に行こう！</p>
                            </div>
                        </div>
                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        {/* <img src={images.characterLowHands} alt="キャラクター手を下げている状態" /> */}
                        <img src={images.characterEgg} alt="たまご" />
                    </div>

                    {/*クエストクリアorクエスト失敗に遷移*/}
                    <div className={styles.button_arrangement}>
                        {isLoading ? (
                            <div className={styles.loading_overlay}>
                                <div className={styles.loader}></div>
                            </div>
                        ) : (
                            <Button variant="small" onClick={goToHome} >到着!</Button>
                        )}

                    </div>

                </div>

            </div>


        </>
    )
}

