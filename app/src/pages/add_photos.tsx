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
    const [albumDate, setAlbumDate] = useState<string | null>(null);
    
    useEffect(() => {
        // URLパラメータまたはstateからアルバムの日付を取得
        const existingAlbumDate = location.state?.albumDate;
        
        if (existingAlbumDate) {
            // 既存のアルバムに追加する場合
            setAlbumDate(existingAlbumDate);
            setCurrentDate(existingAlbumDate);
        } else {
            // 新しいアルバムを作成する場合
            const today = new Date();
            const formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
            setCurrentDate(formattedDate);
        }
        
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
        if (albumDate) {
            // 既存のアルバムに写真を追加
            const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
            const updatedAlbums = existingAlbums.map((album: any) => {
                if (album.date === albumDate) {
                    return {
                        ...album,
                        photos: [
                            ...album.photos,
                            ...photos.map(photo => ({
                                file: photo.file,
                                preview: photo.preview,
                                name: photo.file.name
                            }))
                        ]
                    };
                }
                return album;
            });
            localStorage.setItem('albums', JSON.stringify(updatedAlbums));
            
            // アルバム詳細画面に戻る
            navigate(`/album-detail/${encodeURIComponent(albumDate)}`);
        } else {
            // 新しいアルバムを作成
            const albumData = {
                date: currentDate,
                photos: photos.map(photo => ({
                    file: photo.file,
                    preview: photo.preview,
                    name: photo.file.name
                }))
            };
            
            const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
            existingAlbums.push(albumData);
            localStorage.setItem('albums', JSON.stringify(existingAlbums));
            
            // アルバムホームに遷移
            navigate('/album-home');
        }
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
