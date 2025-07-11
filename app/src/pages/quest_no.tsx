//クエスト未達成画面
import styles from "../styles/quest_no.module.scss";
import images from '../hooks/images';
import { Button } from '../components/Button';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { div } from "framer-motion/client";
// import { style } from "framer-motion/client";

export default function QuestNo() {
    const navigate = useNavigate();
    const [animation, setAnimation] = useState(false);
    const [timing, settiming] = useState(false);

    const goToHome = () => {
        navigate('/')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimation(true);
        }, 500);

        setTimeout(() => {
            settiming(true);
        }, 580)
        return () => clearTimeout(timer);
    }, [])
    return (
        <>
            <div className={styles.no_wrapper}>
                <div className={styles.no_backGra} />
                <div className={styles.no_content}>
                    {/*ここに中身かく*/}
                    {animation ? (
                        <img src={images.questNo} alt="クエスト失敗" className={styles.quest_miss} />
                    ) : (
                        <div style={{ height: "114px" }} />
                    )}

                    {timing ? (
                        <p className={styles.quest_no_text}>目的地まであと<span className={styles.text_accent}>50</span>mだよ</p>
                    ) : (
                        <div style={{ height: "56px" }}></div>
                    )}

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.characterCry} alt="キャラクター泣いている" />
                    </div>

                    {timing ? (
                        <div className={styles.button_arrangement}>
                            <Button variant="blueButton" onClick={goToHome}>やり直す</Button>
                        </div>
                    ) : (
                        <div style={{ height: "53px" }}/>
                    )}
                </div>
            </div>
        </>
    );
};
