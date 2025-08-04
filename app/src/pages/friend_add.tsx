//フレンド追加画面
import images from "../hooks/images";
import styles from "../styles/friend_add.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { style } from "framer-motion/client";

export default function FriendAdd() {
    return (
        <>
            <div className={styles.top_element}>
                <img src={images.closeButton} alt="閉じるボタン" />
                <p className={styles.top_text}>フレンド追加</p>
            </div>

            <div className={styles.search_bar}>
                <div className={styles.input_box}>
                    <input type="search" name="search" placeholder="名前 または ユーザーネーム" />
                    <img src={images.search} alt="検索虫眼鏡" />
                </div>
            </div>

            <div className={styles.request_container}>
                <button className={styles.request_button}>
                    <img src={images.human} alt="人間" />
                    <p className={styles.request_text}>申請リクエスト</p>
                    <img src={images.arrowForward} alt="オレンジ色の次へボタン" />
                </button>
            </div>

            <div>
                {/*検索かけたらフレンド出てくるところ */}
            </div>


        </>
    );
};
