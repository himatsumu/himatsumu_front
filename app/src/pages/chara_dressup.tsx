//着せ替え画面

import images from "../hooks/images";
import styles from "../styles/chara_dressup.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { button, style } from "framer-motion/client";

export default function CharaDressup() {

    const [activeTab, setActiveTab] = useState("owned") //初期のタブはは所得済み

    const tabs = [
        { id: "owned", label: "所得済み" },
        { id: "limited", label: "期間限定" },
        { id: "clothes", label: "服" },
        { id: "hat", label: "ぼうし" },
        { id: "belongings", label: "持ち物" },
        { id: "others", label: "その他" },
    ];

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
                    <div className={styles.dress_up_menu}>
                        <div className={styles.category_tabs}>

                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`${styles.tab_item} ${activeTab === tab.id ? styles.active : ""
                                        }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles.tab_content}>
                            {activeTab === "owned" && (
                                <div className={styles.tab_content_description}>
                                    {/*所得済みの中身*/}
                                </div>
                            )}
                            {activeTab === "limited" && (
                                <div className={styles.tab_content_description}>
                                    {/*期間限定の中身*/}
                                </div>
                            )}
                            {activeTab === "clothes" && (
                                <div className={styles.tab_content_description}>
                                    {/*服の中身*/}
                                </div>
                            )}
                            {activeTab === "hat" && (
                                <div className={styles.tab_content_description}>
                                    {/*帽子の中身*/}
                                </div>
                            )}
                            {activeTab === "belongings" && (
                                <div className={styles.tab_content_description}>
                                    {/*持ち物の中身*/}
                                </div>
                            )}
                            {activeTab === "others" && (
                                <div className={styles.tab_content_description}>
                                    {/*その他の中身*/}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};
