//写真アルバム確認画面
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/photo_album_confirm.module.scss";
import { Button } from "../components/Button";

interface PhotoData {
    file: File;
    preview: string;
}

export default function PhotoAlbumConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [currentDate, setCurrentDate] = useState<string>("");
    
    useEffect(() => {
        // 現在の日付を設定
        const today = new Date();
        const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        setCurrentDate(formattedDate);
        
        // 前の画面から渡されたファイルを取得
        const selectedFiles = location.state?.files as FileList;
        if (selectedFiles) {
            const photoDataArray: PhotoData[] = [];
            
            Array.from(selectedFiles).forEach((file) => {
                const preview = URL.createObjectURL(file);
                photoDataArray.push({ file, preview });
            });
            
            setPhotos(photoDataArray);
        }
    }, [location.state]);

    // コンポーネントがアンマウントされる時にプレビューURLをクリーンアップ
    useEffect(() => {
        return () => {
            photos.forEach(photo => {
                URL.revokeObjectURL(photo.preview);
            });
        };
    }, [photos]);

    const handleAddToAlbum = () => {
        // アルバムに写真を追加する処理
        const albumData = {
            date: currentDate,
            photos: photos.map(photo => ({
                file: photo.file,
                preview: photo.preview,
                name: photo.file.name
            }))
        };
        
        // ローカルストレージに保存（実際のアプリではAPIに送信）
        const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
        existingAlbums.push(albumData);
        localStorage.setItem('albums', JSON.stringify(existingAlbums));
        
        console.log('アルバムに追加されました:', albumData);
        
        // アルバムホームに遷移
        navigate('/album-home');
    };

    const handleCancel = () => {
        // キャンセルして前の画面に戻る
        navigate(-1);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>写真を確認</h1>
                <p className={styles.date}>{currentDate}</p>
            </div>
            
            <div className={styles.content}>
                <p className={styles.description}>
                    選択した写真を確認してください
                </p>
                
                <div className={styles.photoGrid}>
                    {photos.map((photo, index) => (
                        <div key={index} className={styles.photoItem}>
                            <img 
                                src={photo.preview} 
                                alt={`選択した写真 ${index + 1}`}
                                className={styles.photoImage}
                            />
                        </div>
                    ))}
                </div>
                
                <div className={styles.buttonContainer}>
                    <Button 
                        variant="common" 
                        className={styles.cancelBtn} 
                        onClick={handleCancel}
                    >
                        キャンセル
                    </Button>
                    <Button 
                        variant="common" 
                        className={styles.addBtn} 
                        onClick={handleAddToAlbum}
                    >
                        アルバムに追加
                    </Button>
                </div>
            </div>
        </div>
    );
}
