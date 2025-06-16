//クエストクリア画面
//ダイアログでポイント表示
//import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import "../styles/quest_clear.scss";

export default function QuestClear() {
    //参照(ref)を作る
    const dialogRef = useRef<HTMLDialogElement>(null);  //この参照はHTMLの<dialog>要素にくっつける(nullなので今はまだ何も参照してないよ)
    const handleShowModal = () => dialogRef.current?.showModal();   //showModal()　dialogを画面に表示する
    const handleCloseModal = () => dialogRef.current?.close();      //close()      dialogを閉じる
    return (
        <>
            <p className="text-quest">クエストクリア達成</p>

            <div className="image-placeholder">キャラクター画像</div>
            <button type="button" onClick={handleShowModal}>ダイアログおーぷん〜</button>

            {/*ダイアログ*/}
            <dialog ref={dialogRef} className="quest-dialog">
                <div className="dialog-intext">
                    <h1>クエスト続ける？</h1>
                </div>
                <button type="button">続ける</button>
                <button type="button" onClick={handleCloseModal}>今日は終了</button>

            </dialog>
        </>
    );
};
