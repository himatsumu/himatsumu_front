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
    const [modalMode, setModalMode] = useState<"buy" | "owned" | "reset">("buy");



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
    const itemsByTab: Record<string, { thumb: string; dressImg: string }[]> = {
        limited: [
            { thumb: images.SuitThumb, dressImg: images.SuitDress },
            { thumb: images.ChildThumb, dressImg: images.ChildDress },
            { thumb: images.MaidThumb, dressImg: images.MaidDress },
        ],
        clothes: [
            { thumb: images.SuitThumb, dressImg: images.SuitDress },
            { thumb: images.ChildThumb, dressImg: images.ChildDress },
            { thumb: images.MaidThumb, dressImg: images.MaidDress },
            { thumb: images.RaincoatThumb, dressImg: images.RaincoatDress },
            { thumb: images.SantaThumb, dressImg: images.SantaDress },
            { thumb: images.MarineThumb, dressImg: images.MarineDress },
            { thumb: images.InsectThumb, dressImg: images.InsectDress },
        ],
        hat: [
            { thumb: images.SuitHatThumb, dressImg: images.SuitHatDress },
            { thumb: images.ChildHatThumb, dressImg: images.ChildHatDress },
            { thumb: images.MaidHatThumb, dressImg: images.MaidHatDress },
            { thumb: images.SantaHatThumb, dressImg: images.SantaHatDress },
            // { thumb: images.MarineHatThumb, dressImg: images.MarineHatDress },
            { thumb: images.InsectHatThumb, dressImg: images.InsectHatDress }
        ],
        belongings: [
            { thumb: images.ChildBelongingsThumb, dressImg: images.ChildBelongingsDress },
            // { thumb: images.InsectBelongingsThumb, dressImg: images.InsectBelongingsDress },
            { thumb: images.InsectBelongingsBagThumb, dressImg: images.InsectBelongingsBagDress },
        ],
        others: [],
    };

    const ownedTab: Record<string, { thumb: string; dressImg: string }[]> = {
        clothes: [
            { thumb: images.SuitThumb, dressImg: images.SuitDress },
            { thumb: images.ChildThumb, dressImg: images.ChildDress },
            { thumb: images.MaidThumb, dressImg: images.MaidDress },
            { thumb: images.RaincoatThumb, dressImg: images.RaincoatDress },
            { thumb: images.SantaThumb, dressImg: images.SantaDress },
            { thumb: images.MarineThumb, dressImg: images.MarineDress },
            { thumb: images.InsectThumb, dressImg: images.InsectDress }
        ],
        hat: [
            { thumb: images.SuitHatThumb, dressImg: images.SuitHatDress },
            { thumb: images.ChildHatThumb, dressImg: images.ChildHatDress },
            { thumb: images.MaidHatThumb, dressImg: images.MaidHatDress },
            { thumb: images.SantaHatThumb, dressImg: images.SantaHatDress },
            { thumb: images.InsectHatThumb, dressImg: images.InsectHatDress }
        ],
        belongings: [
            { thumb: images.ChildBelongingsThumb, dressImg: images.ChildBelongingsDress },
            { thumb: images.InsectBelongingsBagThumb, dressImg: images.InsectBelongingsBagDress },
        ],
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

                    {/* キャラクター */}
                    <div className={styles.chara_box}>
                        <img src={images.DressupCharacter} alt="キャラクター画像" />
                        {(selectedClothesItem || dressupClothed) &&
                            <img
                                src={selectedClothesItem || dressupClothed!}
                                alt="服"
                                className={styles.overlay_item}
                            />}
                        {(selectedHatItem || dressupHat) &&
                            <img
                                src={selectedHatItem || dressupHat!}
                                alt="帽子"
                                className={styles.overlay_item}
                            />}
                        {(selectedBelongingsItem || dressupBelongings) &&
                            <img
                                src={selectedBelongingsItem || dressupBelongings!}
                                alt="持ち物"
                                className={styles.overlay_item}
                            />}
                    </div>


                    <div className={styles.button_box}>
                        {shouldShowButton && (
                            <div className={styles.right_buttons}>
                                <Button variant="dressupBuy" onClick={() => {
                                    setModalMode("buy");
                                    setIsModalOpen(true);
                                }}>
                                    購入画面へ
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className={styles.button_owned_box}>
                        {shouldShowOwnedButton && (
                            <>
                                <Button variant="buttonReset" onClick={() => {
                                    setModalMode("reset");
                                    setIsModalOpen(true);
                                }}>
                                    リセット
                                </Button>

                                <Button variant="dressupBuy" onClick={() => {
                                    setModalMode("owned");
                                    setIsModalOpen(true);
                                }}>
                                    決定
                                </Button>

                            </>
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
                                        {modalMode === "buy" && (
                                            <>
                                                <p>このアイテムを</p>
                                                <p>購入しますか？</p>
                                                <div className={styles.rest_text}>
                                                    <p>購入後；残り</p>
                                                    <span><img src={images.coin} alt="コイン" />50</span>
                                                </div>
                                            </>
                                        )}

                                        {modalMode === "owned" && (
                                            <>
                                                <div className={styles.owned_modal_text}>
                                                    <p>コーディネートこれで決定？</p>
                                                </div>
                                            </>
                                        )}


                                        {modalMode === "reset" && (
                                            <div className={styles.reset_modal_text}>
                                                <p>コーディネート</p>
                                                <p>リセットしますか？</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.btnWrap}>
                                    <Button variant="common" className={styles.questBtn} onClick={handleModalClose}>キャンセル</Button>
                                    {modalMode === "buy" && (
                                        <>
                                            <Button variant="common" className={styles.selectBtn} >購入 </Button>
                                        </>
                                    )}
                                    {modalMode === "owned" && (
                                        <>
                                            <Button variant="common" className={styles.selectBtn} >決定 </Button>
                                        </>
                                    )}
                                    {modalMode === "reset" && (
                                        <>
                                            <Button variant="common" className={styles.selectBtn} onClick={() => {
                                                setDressupClothed(null);
                                                setDressupHat(null);
                                                setDressupBelongings(null);
                                                setIsModalOpen(false)
                                            }}>
                                                はい
                                            </Button>
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
                                    onClick={() => {
                                        setActiveTab(tab.id)

                                        // 所持済みタブに移動したら購入プレビューをリセット
                                        if (tab.id === "owned") {
                                            setSelectedClothesItem(null);
                                            setSelectedHatItem(null);
                                            setSelectedBelongingsItem(null);
                                        } else {
                                            // 購入系タブに移動したら着せ替え済みをリセット
                                            setDressupClothed(null);
                                            setDressupHat(null);
                                            setDressupBelongings(null);
                                        }

                                    }}
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
                                                        className={`${styles.dress_box} ${dressupClothed === item.dressImg ? styles.selected : ''}`}
                                                        onClick={() =>
                                                            setDressupClothed(
                                                                dressupClothed === item.dressImg ? null : item.dressImg
                                                            )
                                                        }
                                                    >
                                                        <img src={item.thumb} alt="幼稚園児（服）" />
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
                                                        className={`${styles.dress_box} ${dressupHat === item.dressImg ? styles.selected : ''}`}
                                                        onClick={() =>
                                                            setDressupHat(
                                                                dressupHat === item.dressImg ? null : item.dressImg
                                                            )
                                                        }

                                                    >
                                                        <img src={item.thumb} alt="幼稚園児（帽子）" />
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
                                                        className={`${styles.dress_box} ${dressupBelongings === item.dressImg ? styles.selected : ''}`}
                                                        onClick={() =>
                                                            setDressupBelongings(
                                                                dressupBelongings === item.dressImg ? null : item.dressImg
                                                            )
                                                        }

                                                    >
                                                        <img src={item.thumb} alt="幼稚園児（持ち物）" />
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
                                                className={`${styles.dress_box} ${selectedClothesItem === item.dressImg ? styles.selected : ''}`}
                                                onClick={() =>
                                                    setSelectedClothesItem(
                                                        selectedClothesItem === item.dressImg ? null : item.dressImg
                                                    )
                                                }
                                            >
                                                <img src={item.thumb} alt={`服アイテム${index}`} />
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
                                                className={`${styles.dress_box} ${selectedHatItem === item.dressImg ? styles.selected : ''}`}
                                                onClick={() =>
                                                    setSelectedHatItem(
                                                        selectedHatItem === item.dressImg ? null : item.dressImg
                                                    )
                                                }
                                            >
                                                <img src={item.thumb} alt={`帽子アイテム${index}`} />
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
                                                className={`${styles.dress_box} ${selectedBelongingsItem === item.dressImg ? styles.selected : ''}`}
                                                onClick={() =>
                                                    setSelectedBelongingsItem(
                                                        selectedBelongingsItem === item.dressImg ? null : item.dressImg
                                                    )
                                                }
                                            >
                                                <img src={item.thumb} alt={`持ち物アイテム${index}`} />
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
