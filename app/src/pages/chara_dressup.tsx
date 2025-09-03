//着せ替え画面

import images from "../hooks/images";
import styles from "../styles/chara_dressup.module.scss";
import { Button } from '../components/Button';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { button, style } from "framer-motion/client";

export default function CharaDressup() {

    const [activeTab, setActiveTab] = useState("owned"); //初期のタブはは所得済み
    const [activeOwnedTab, setActiveOwnedTab] = useState("clothes");
    const [selectedClothesItem, setSelectedClothesItem] = useState<string | null>(null);
    const [selectedHatItem, setSelectedHatItem] = useState<string | null>(null);
    const [selectedBelongingsItem, setSelectedBelongingsItem] = useState<string | null>(null);
    const [dressupClothed, setDressupClothed] = useState<string | null>(null);
    const [dressupHat, setDressupHat] = useState<string | null>(null);
    const [dressupBelongings, setDressupBelongings] = useState<string | null>(null);
    const showButtonTabs = ["limited", "clothes", "hat", "belongings", "others"];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"buy" | "owned">("buy");



    const selectedItem =
        activeTab === "clothes" ? selectedClothesItem :
            activeTab === "hat" ? selectedHatItem :
                activeTab === "belongings" ? selectedBelongingsItem :
                    null;

    // 所得済みタブで選択されているアイテム
    const ownedSelectedItem =
        activeOwnedTab === "clothes" ? dressupClothed :
            activeOwnedTab === "hat" ? dressupHat :
                activeOwnedTab === "belongings" ? dressupBelongings :
                    null;


    const shouldShowButton = showButtonTabs.includes(activeTab) && activeTab !== "owned" && selectedItem !== null;
    const shouldShowOwnedButton = activeTab === "owned" && ownedSelectedItem !== null;

    const tabs = [
        { id: "owned", label: "所得済み" },
        { id: "limited", label: "期間限定" },
        { id: "clothes", label: "服" },
        { id: "hat", label: "ぼうし" },
        { id: "belongings", label: "持ち物" },
        { id: "others", label: "その他" },
    ];

    const ownedTabs = [
        { id: "clothes", label: "服" },
        { id: "hat", label: "ぼうし" },
        { id: "belongings", label: "持ち物" },
        { id: "others", label: "その他" },
    ]
    //タブごとのアイテム一覧
    const itemsByTab: Record<string, string[]> = {
        limited: [images.SuitThumb],
        clothes: [images.SuitThumb, images.ChildThumb, images.MaidThumb, images.RaincoatThumb, images.SantaThumb, images.MarineThumb, images.InsectThumb],
        hat: [images.SuitHatThumb, images.ChildHatThumb, images.MaidHatThumb, images.SantaHatThumb, images.MarineHatThumb, images.InsectHatThumb],
        belongings: [images.ChildBelongingsThumb, images.InsectBelongingsThumb, images.InsectBelongingsBagThumb],
        others: [],
    };

    const ownedTab: Record<string, string[]> = {
        clothes: [images.ChildThumb],
        hat: [images.ChildHatThumb],
        belongings: [images.ChildBelongingsThumb],
        others: [],
    };

    //モーダルを閉じる
    const handleModalClose = () => {
        setIsModalOpen(false)
    }

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


                    <div className={styles.button_box}>
                        {shouldShowButton && (
                            <Button variant="dressupBuy" onClick={() => {
                                setModalMode("buy");
                                setIsModalOpen(true);
                            }}>
                                購入画面へ
                            </Button>
                        )}
                        {shouldShowOwnedButton && (
                            <Button variant="dressupBuy" onClick={() => {
                                setModalMode("owned");
                                setIsModalOpen(true);
                            }}>
                                決定
                            </Button>
                        )}
                    </div>

                    {isModalOpen && (
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalContent}>
                                <div className={styles.modalBuyDress}>
                                    {modalMode === "buy" && (
                                        <div className={styles.dressImg}>
                                            {/*購入するアイテムの画像*/}
                                            {selectedItem && <img src={selectedItem} alt="購入アイテム" />}
                                            <div className={styles.price_box}>
                                                <img src={images.coin} alt="コイン" />
                                                <span className={styles.coin_num}>50</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className={styles.dialogIntext}>
                                        {modalMode === "buy" ? (
                                            <>
                                                <p>このアイテムを</p>
                                                <p>購入しますか？</p>
                                                <div className={styles.rest_text}>
                                                    <p>購入後；残り</p>
                                                    <span><img src={images.coin} alt="コイン" />50</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.owned_modal_text}>
                                                    <p>コーディネートこれで決定？</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.btnWrap}>
                                    <Button variant="common" className={styles.questBtn} onClick={handleModalClose}>キャンセル</Button>
                                    {modalMode === "buy" ? (
                                        <>
                                            <Button variant="common" className={styles.selectBtn} >購入 </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="common" className={styles.selectBtn} >決定 </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}


                    {/*着せ替えアイテム一覧*/}
                    <div className={styles.dress_up_menu}>
                        {/*タブ*/}
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
                                <div className={styles.owned_tab_content_description}>
                                    <div className={styles.owned_tabs}>
                                        {/*所得済みの中身*/}
                                        {ownedTabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                className={`${styles.tab_item} ${activeOwnedTab === tab.id ? styles.active : ""
                                                    }`}
                                                onClick={() => setActiveOwnedTab(tab.id)}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {activeOwnedTab === "clothes" && (
                                        <div className={styles.tab_content_description}>
                                            {/*所得済み（服）の中身*/}
                                            <div className={styles.items_grid}>
                                                {ownedTab.clothes.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.dress_box} ${dressupClothed === item ? styles.selected : ''}`}
                                                        onClick={() => setDressupClothed(item)}
                                                    >
                                                        <img src={item} alt="幼稚園児（服）" />
                                                        <div className={styles.price_box}>
                                                            <img src={images.coin} alt="コイン" />
                                                            <span className={styles.coin_num}>50</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeOwnedTab === "hat" && (
                                        <div className={styles.tab_content_description}>
                                            {/*所得済み（帽子）の中身*/}
                                            <div className={styles.items_grid}>
                                                {ownedTab.hat.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.dress_box} ${dressupHat === item ? styles.selected : ''}`}
                                                        onClick={() => setDressupHat(item)}
                                                    >
                                                        <img src={item} alt="幼稚園児（帽子）" />
                                                        <div className={styles.price_box}>
                                                            <img src={images.coin} alt="コイン" />
                                                            <span className={styles.coin_num}>50</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeOwnedTab === "belongings" && (
                                        <div className={styles.tab_content_description}>
                                            {/*所得済み（帽子）の中身*/}
                                            <div className={styles.items_grid}>
                                                {ownedTab.belongings.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.dress_box} ${dressupBelongings === item ? styles.selected : ''}`}
                                                        onClick={() => setDressupBelongings(item)}
                                                    >
                                                        <img src={item} alt="幼稚園児（持ち物）" />
                                                        <div className={styles.price_box}>
                                                            <img src={images.coin} alt="コイン" />
                                                            <span className={styles.coin_num}>50</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}


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
                                    <div className={styles.items_grid}>
                                        {itemsByTab.clothes.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.dress_box} ${selectedClothesItem === item ? styles.selected : ''}`}
                                                onClick={() => setSelectedClothesItem(item)}
                                            >
                                                <img src={item} alt={`服アイテム${index}`} />
                                                <div className={styles.price_box}>
                                                    <img src={images.coin} alt="コイン" />
                                                    <span className={styles.coin_num}>50</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === "hat" && (
                                <div className={styles.tab_content_description}>
                                    {/*帽子の中身*/}
                                    <div className={styles.items_grid}>
                                        {itemsByTab.hat.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.dress_box} ${selectedHatItem === item ? styles.selected : ''}`}
                                                onClick={() => setSelectedHatItem(item)}
                                            >
                                                <img src={item} alt={`帽子アイテム${index}`} />
                                                <div className={styles.price_box}>
                                                    <img src={images.coin} alt="コイン" />
                                                    <span className={styles.coin_num}>50</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === "belongings" && (
                                <div className={styles.tab_content_description}>
                                    {/*持ち物の中身*/}
                                    <div className={styles.items_grid}>
                                        {itemsByTab.belongings.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.dress_box} ${selectedBelongingsItem === item ? styles.selected : ''}`}
                                                onClick={() => setSelectedBelongingsItem(item)}
                                            >
                                                <img src={item} alt={`持ち物アイテム${index}`} />
                                                <div className={styles.price_box}>
                                                    <img src={images.coin} alt="コイン" />
                                                    <span className={styles.coin_num}>50</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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
