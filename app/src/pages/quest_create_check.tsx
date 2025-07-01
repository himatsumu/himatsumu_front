import styles from '../styles/quest_create_check.module.scss';
import images from '../hooks/images';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

interface FormData {
  plan: string;
  endTime: string;
  startLocation: string;
  budget: number;
  genre: string;
}

export default function Quest_create_check() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state as FormData || {};
    
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/quest-create', { state: formData });
    };
    
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backBtn}>
          </button>
          <h1>クエスト生成<span>(2/2)</span></h1>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formItem}>
            <p className={styles.label}>今日の予定</p>
            <p className={styles.value}>{formData.plan || "未入力"}</p>
          </div>
          <div className={styles.formItem}>
            <p className={styles.label}>終了時間</p>
            <p className={styles.value}>{formData.endTime || "未入力"}</p>
          </div>
          <div className={styles.formItem}>
            <p className={styles.label}>開始場所</p>
            <p className={styles.value}>{formData.startLocation || "未入力"}</p>
          </div>
          <div className={styles.formItem}>
            <p className={styles.label}>予算</p>
            <p className={styles.value}>{formData.budget ? `¥${formData.budget}` : "未入力"}</p>
          </div>
          <div className={styles.formItem}>
            <p className={styles.label}>ジャンル選択</p>
            <p className={styles.value}>{formData.genre || "未選択"}</p>
          </div>
        </div>
        <div className={styles.btnWrap}>
          <Button className={styles.backBtn} variant="blueButton" onClick={handleBack}>
            修正する
          </Button>
          <Button className={styles.nextBtn} variant="small">
            クエストを生成!
          </Button>
        </div>
      </div>
    );
}