//クエストクリア画面
//ダイアログでポイント表示
//import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from "react";
import "../styles/quest_clear.scss";
import images from "../hooks/images";

export default function QuestClear() {

    const [isClear, setIsClear] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClear(true); // 3秒後にtrueにする
        }, 5000);

        return () => clearTimeout(timer); // クリーンアップ
    }, []);
        //参照(ref)を作る
        // const dialogRef = useRef<HTMLDialogElement>(null);  //この参照はHTMLの<dialog>要素にくっつける(nullなので今はまだ何も参照してないよ)
        // const handleShowModal = () => dialogRef.current?.showModal();   //showModal()　dialogを画面に表示する
        // const handleCloseModal = () => dialogRef.current?.close();      //close()      dialogを閉じる
        return (
            <>
                <div className="wrapper">
                    <div className="backGra" />
                    <div className="content">
                        <img src={images.questClear} alt="クエスト達成" />

                        <div className="clear-text">
                        {isClear ? (
                            <p>20ポイントゲット！</p>
                        ) : (
                            <>
                                <p>（相手の名前）が</p>
                                <p>クエスト達成するまで待っててね</p>
                            </>
                        )} 
                        </div>

                        {/*キャラクター*/}
                        <div className="image-placeholder">
                            <img src={images.characterLowHands} alt="キャラクター手を下げている状態" />
                        </div>




                        {/* <button type="button" onClick={handleShowModal}>ダイアログおーぷん〜</button>

                    ダイアログ
                    <dialog ref={dialogRef} className="quest-dialog">
                        <div className="dialog-intext">
                            <h1>クエスト続ける？</h1>
                        </div>
                        <button type="button">続ける</button>
                        <button type="button" onClick={handleCloseModal}>今日は終了</button>

                    </dialog> */}
                    </div>
                </div>

            </>
        );
    };
