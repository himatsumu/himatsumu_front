import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/quest_create.module.scss";
import { Button } from "../components/Button";
import images from "../hooks/images";

interface FormData {
  plan: string;
  endTime: string;
  startLocation: string;
  budget: string;
  genre: string;
}

export default function Quest_create() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 戻ってきた場合のデータを取得
  const previousData = location.state as FormData || {};
  
  const [selectedGenre, setSelectedGenre] = useState<string>(previousData.genre || "");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    plan: previousData.plan || "",
    endTime: previousData.endTime || "",
    startLocation: previousData.startLocation || "",
    budget: previousData.budget || ""
  });

  const GenreBtn = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォームデータと選択されたジャンルを確認画面に渡す
    navigate("/quest-create-check", {
      state: {
        ...formData,
        genre: selectedGenre
      }
    });
  };

  const handleBack = () => { 
    navigate("/friend-home");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <img src={images.arrowBackBlack}  alt="戻る" />
        </button>
        <h1>クエスト生成<span>(1/2)</span></h1>
      </div>
      <form action="" className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label>今日の予定</label>
          <input 
            type="text" 
            name="plan" 
            value={formData.plan}
            onChange={handleInputChange}
            placeholder="例：映画"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div className={styles.formItem}>
          <label>終了時間</label>
          <input 
            type="time" 
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formItem}>
          <label>開始場所</label>
          <input 
            type="text" 
            name="startLocation" 
            value={formData.startLocation}
            onChange={handleInputChange}
            placeholder="例：梅田"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div className={styles.formItem}>
          <label>予算</label>
          <div className={styles.budgetInputWrapper}>
            <span>¥</span>
            <input 
              type="number" 
              name="budget" 
              value={formData.budget}
              onChange={handleInputChange}
              min="0" 
              placeholder="3000"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={styles.budgetInput}
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <label className={styles.genreLabel}>ジャンル選択</label>
          <div className={styles.genreBtnWrap}>
            <button 
              type="button" 
              className={`${styles.genreBtn} ${selectedGenre === "ご飯系" ? styles.selected : ""}`}
              onClick={() => GenreBtn("ご飯系")}
            >
              ご飯系
            </button>
            <button 
              type="button" 
              className={`${styles.genreBtn} ${selectedGenre === "ショッピング系" ? styles.selected : ""}`}
              onClick={() => GenreBtn("ショッピング系")}
            >
              ショッピング系
            </button>
            <button 
              type="button" 
              className={`${styles.genreBtn} ${selectedGenre === "エンターテイメント系" ? styles.selected : ""}`}
              onClick={() => GenreBtn("エンターテイメント系")}
            >
              エンターテイメント系
            </button>
          </div>
        </div>
      </form>
      {!isInputFocused && (
        <Button className={styles.nextBtn} type="submit" variant="buttonOther" onClick={handleSubmit}>
          内容を確認
        </Button>
      )}
    </div>
  );
}
