//フレンドになったよ
//名前をつけよう
//キャラ名設定
import images from "../hooks/images";
import styles from "../styles/chara_name_setup.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';


export default function CharaNameSetup() {
    const [startText, setStartText] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartText(true);
            return () => clearTimeout(timer);
        }, 3000)
    })

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    return (
        <>
            {startText ? (
                <div>
                    <div className={styles.top_text}>
                        <p>あやかと育てる</p>
                        <p>このキャラクターに</p>
                        <p>名前をつけよう！</p>
                    </div>
                </div>
            ) : (
                <div className={styles.top_text}>
                    <p>あやかと</p>
                    <p>フレンドになったよ！</p>
                </div>
            )}

            <div className={styles.image_box}>
                <img src={images.characterEgg} alt="キャラクター画像" />
            </div>

            {startText ? (
                <div>
                    <div className={styles.button_box}>
                        <Button variant="buttonCreate" onClick={handleOpenModal}>名前をつける</Button>
                    </div >
                </div>
            ) : (
                <></>
            )
            }


            {/*モーダル*/}
            {isModalOpen && (
                <div className={styles.modalWrapper}>
                    <div className={styles.modalContent}>
                        <div className={styles.dialogIntext}>
                            <p>名前を考えてね</p>
                        </div>

                        <div className={styles.name_create_box}>
                            <input type="text" className={styles.name_create} required />
                            <button>
                                <img src={images.shuffle} alt="名前ランダム生成" />
                            </button>
                        </div>

                        <div className={styles.btnWrap}>
                            <Button variant="buttonNameCreate" >確認 </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
