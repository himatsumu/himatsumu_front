import { useNavigate } from "react-router-dom";
import images from "../hooks/images";
import styles from "../styles/friend_list.module.scss";

export default function Friend_list() {
    const navigate = useNavigate();
    
    const handleNext = () => {
        navigate('/friend-home');
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>フレンド一覧</h1>
                <button>
                    <img src={images.friendAdd} alt="フレンド追加ボタン" />
                </button>
            </div>
            <ul className={styles.friendList}>
                <li onClick={handleNext}>
                    <p>あやか</p>
                    <img src={images.faceOnly} alt="顔だけのキャラクター" />
                </li>
                <li>
                    <p>るい</p>
                    <img src={images.faceOnly} alt="顔だけのキャラクター" />
                </li>
                <li>
                    <p>ひかり</p>
                    <img src={images.faceOnly} alt="顔だけのキャラクター" />
                </li>
            </ul>
        </div>
    )
}