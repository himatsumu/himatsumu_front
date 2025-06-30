import styles from "../styles/quest_start.module.scss";
import { Button } from "../components/Button";
import images from "../hooks/images";

export default function Quest_start() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn}>
          <img src={images.arrowBackBlack}  alt="戻る" />
        </button>
        <h1>クエスト生成(1/2)</h1>
      </header>
      <form action="" className={styles.formWrapper}>
        <div className={styles.formItem}>
          <label>①今日の予定</label>
          <input type="text" name="plan" placeholder="例：映画" />
        </div>
        <div className={styles.formItem}>
          <label>②終了時間</label>
          <input type="time" name="end_time" />
        </div>
        <div className={styles.formItem}>
          <label>③開始場所</label>
          <input type="text" name="start_location" placeholder="例：梅田" />
        </div>
        <div className={styles.formItem}>
          <label>④予算</label>
          <input type="number" name="budget" min="0" placeholder="例：1500" />
        </div>
        <div className={styles.formItem}>
          <label>⑤ジャンル選択</label>
          <input type="text" name="genre" placeholder="例：エンターテイメント" />
        </div>
      </form>
      <Button className={styles.nextBtn} type="submit" variant="buttonOther">
        内容を確認
      </Button>
    </div>
  );
}
