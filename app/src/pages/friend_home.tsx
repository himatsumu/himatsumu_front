import styles from "../styles/friend_home.module.scss";
import images from "../hooks/images";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useDressup } from "../hooks/useDressup";
import { useEffect, useState } from "react";

export default function Friend_home() {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log("戻るボタン");
    navigate('/friend-list');
  };

  const QuestPage = () => {
    console.log("進むボタン");
    navigate('/quest-create');
  };

  const AlbumHome = () => {
    console.log("アルバム");
    navigate('/album-home');
  };

  const handleDressup = () => {
    navigate('/chara_dressup');
  }

  const { dressupClothed, dressupHat, dressupBelongings } = useDressup();
  const [isEvolved, setIsEvolved] = useState(false);

  //e展用にリロードしたらキャラの状態リセットされる
  useEffect(() => {
    const resetCharacter = () => {
      localStorage.removeItem("characterImage");
      localStorage.removeItem("dressupClothes");
      localStorage.removeItem("dressupHat");
      localStorage.removeItem("dressupBelongings");
    };

    // ページがリロード/閉じられる時に実行
    window.addEventListener("beforeunload", resetCharacter);

    return () => {
      window.removeEventListener("beforeunload", resetCharacter);
    };
  }, []);

  useEffect(() => {
    const savedCharacter = localStorage.getItem("characterImage");
    if (savedCharacter) {
      setIsEvolved(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <img src={images.arrowBackBlack}  alt="戻る" />
        </button>
        <h1>るい</h1>
      </div>
      <div className={styles.countInfo}>
        <div className={styles.point}>
          <img src={images.coin} alt="コイン" />
          <span>60</span>
        </div>
        <div className={styles.goCount}>
          <p>遊びに行った回数</p>
          <span>01</span>
        </div>
        <div className={styles.questCount}>
          <p>クエスト達成数</p>
          <span>03</span>
        </div>
      </div>
      <div className={styles.characterWrapper}>
        <div className={styles.characterHeader}>
          <p>
            レベル<span>1</span>
          </p>
          <h2>もも</h2>
        </div>
        {/* <div className={styles.characterWrap}> */}
          <div className={styles.chara_box}>
          {isEvolved ? (
            <img src={images.DressupCharacter} alt="キャラクター" />
          ) : (
            <img src={images.characterEgg} alt="キャラクター（卵）" />
          )}
          {isEvolved && dressupClothed && (
            <img src={dressupClothed} className={styles.overlay_item} alt="服" />
          )}
          {isEvolved && dressupHat && (
            <img src={dressupHat} className={styles.overlay_item} alt="帽子" />
          )}
          {isEvolved && dressupBelongings && (
            <img src={dressupBelongings} className={styles.overlay_item} alt="持ち物" />
          )}
          {/* <img src={images.characterLowHands} alt="キャラクター" /> */}
        </div>
      </div>
      <div className={styles.btnWrap}>
        <Button className={styles.subBtn} variant="buttonOther" onClick={AlbumHome}>
          <img src={images.album} alt="アルバムのアイコン" />
        </Button>
        <Button className={styles.questBtn} variant="small" onClick={QuestPage}>
          クエスト生成
        </Button>
        <Button className={styles.subBtn} variant="buttonOther" onClick={handleDressup}>
          <img src={images.dressUp} alt="着せ替えのアイコン" />
        </Button>
      </div>
    </div>
  );
}
