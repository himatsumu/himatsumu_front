//申請リクエスト
import images from "../hooks/images";
import styles from "../styles/friend_apply.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function FriendApply() {
    const navigate = useNavigate();

    const handleBack = (() => {
        navigate("/friend_add")
    })
    return (
        <>
            <div className={styles.header}>
                <button onClick={handleBack}>
                    <img src={images.arrowBackBlack} alt="前の画面に戻る" />
                </button>
                <h1 className={styles.top_text}>申請リクエスト</h1>
            </div>
        </>
    );
};
