//着せ替え画面

import images from "../hooks/images";
import styles from "../styles/chara_dressup.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function CharaDressup() {
    return (
        <>
            <div className={styles.wrapper}>
                {/*背景画像*/}
                <div className={styles.backImage} />

                <div className={styles.content}>

                    <div className={styles.top_element}>
                        <img src={images.closeButton} alt="閉じる" />
                        <p className={styles.top_text}>着せ替え</p>
                        <div className={styles.coin_box}>
                            <img src={images.coin} alt="コイン" />
                            <span className={styles.coin_num}>100</span>
                        </div>
                    </div>

                    <div className={styles.chara_box}>
                        <img src={images.DressupCharacter} alt="キャラクター画像" />
                    </div>

                    {/*横スクロール*/}
                    <div>
                        <div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};
