import { Button } from './Button';
import styles from './LocationModal.module.scss';

interface LocationData {
  name: string;
  address: string;
  openTime: string;
  reviews?: string[];
  types?: string[];
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationData | null;
  onSelectLocation: () => void;
  onStartQuest: () => void;
}

export default function LocationModal({ 
  isOpen, 
  onClose, 
  location, 
  onSelectLocation, 
  onStartQuest 
}: LocationModalProps) {
  if (!isOpen || !location) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalWrapper} onClick={handleBackdropClick}>
        <div className={styles.modalContent}>
            <div className={styles.locationInfo}>
                <h3>{location.name}</h3>
                <p className={styles.address}>{location.address}</p>
                <p className={styles.openTime}>{location.openTime}</p>
                
                {location.types && location.types.length > 0 && (
                    <div className={styles.types}>
                        <h4>カテゴリ:</h4>
                        <div className={styles.typeList}>
                            {location.types.map((type, index) => (
                                <span key={index} className={styles.typeTag}>
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                {location.reviews && location.reviews.length > 0 && (
                    <div className={styles.reviews}>
                        <h4>レビュー:</h4>
                        <div className={styles.reviewList}>
                            {location.reviews.slice(0, 2).map((review, index) => (
                                <div key={index} className={styles.reviewItem}>
                                    <p>{review.length > 100 ? `${review.substring(0, 100)}...` : review}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.btnWrap}>
                <Button
                    className={styles.selectBtn}
                    onClick={onSelectLocation}
                    variant="blueButton"
                >
                    選び直す
                </Button>
                <Button
                    className={styles.questBtn}
                    onClick={onStartQuest}
                    variant="small"
                >
                    クエスト開始
                </Button>
            </div>
      </div>
    </div>
  );
}
