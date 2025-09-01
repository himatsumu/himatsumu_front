//写真アルバム確認画面
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../styles/add_photos.module.scss";
import { Button } from "../components/Button";

interface PhotoData {
    file: File;
    preview: string;
}

export default function AddPhotos() {
    const navigate = useNavigate();
    const location = useLocation();
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [currentDate, setCurrentDate] = useState<string>("");
    
    useEffect(() => {
        // 現在の日付を設定
        const today = new Date();
        const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
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


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.date}>{currentDate}</h1>
            </div>
            
            <div className={styles.photosWrap}>                
                <div className={styles.photoGrid}>
                    {photos.map((photo, index) => (
                        <div key={index} className={styles.photoItem}>
                            <img 
                                src={photo.preview} 
                                alt={`選択した写真 ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                
                <div className={styles.btnWrap}>
                    <Button 
                        variant="small" 
                        onClick={handleAddToAlbum}
                        className={styles.addBtn}
                    >
                        アルバムに追加
                    </Button>
                </div>
            </div>
        </div>
    );
}
