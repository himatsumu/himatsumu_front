import { Button } from "./Button";
import styles from './FriendCard.module.scss';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export default function FriendCard() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <div className={styles.friend_card}>
                <div className={styles.friend_box}>
                    <div className={styles.user_info}>
                        <span className={styles.user_name}>あやか</span>
                        <span className={styles.user_id}>@s7chan</span>
                    </div>
                    {path === "/friend_add" && (
                        <div className={styles.button_box}>
                            <Button variant="buttonAddRequest">追加申請</Button>
                        </div>
                    )}
                    {path === "/friend_apply" && (
                        <div className={styles.button_box}>
                            <div className={styles.button_flex}>
                                <Button variant="buttonDelete">削除</Button>
                                <Button variant="buttonAddRequest">申請許可</Button>
                            </div>

                        </div>
                    )}



                </div>
            </div>
        </>
    );
};
