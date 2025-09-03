import styles from "../styles/friend_home.module.scss";
import images from "../hooks/images";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useDressup } from "../hooks/useDressup";

// 最終プレゼンのデモ用
export default function Friend_home_finish() {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log("戻るボタン");
    navigate('/friend-list');
  };

  const QuestPage = () => {
    console.log("進むボタン");
    navigate('/quest-create');
  };

  const handleDressup = () => {
    navigate('/chara_dressup');
  }

  const { dressupClothed, dressupHat, dressupBelongings } = useDressup();

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
          <span>80</span>
        </div>
        <div className={styles.goCount}>
          <p>遊びに行った回数</p>
          <span>02</span>
        </div>
        <div className={styles.questCount}>
          <p>クエスト達成数</p>
          <span>04</span>
        </div>
      </div>
      <div className={styles.characterWrapper}>
        <div className={styles.characterHeader}>
          <p>
            レベル<span>2</span>
          </p>
          <h2>もも</h2>
        </div>
        <div className={styles.chara_box}>
          <img src={images.DressupCharacter} alt="キャラクター" />
          {dressupClothed && <img className={styles.overlay_item} src={dressupClothed} alt="服" />}
          {dressupHat && <img className={styles.overlay_item} src={dressupHat} alt="帽子" />}
          {dressupBelongings && <img className={styles.overlay_item} src={dressupBelongings} alt="持ち物" />}
        </div>
      </div>
      <div className={styles.btnWrap}>
        <Button className={styles.subBtn} variant="buttonOther">
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
