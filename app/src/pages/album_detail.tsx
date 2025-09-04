import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import images from '../hooks/images';
import styles from '../styles/album_detail.module.scss';

interface PhotoData {
    name: string;
    data: string;  // Base64エンコードされた画像データ
    size: number;
    type: string;
}

interface AlbumData {
    date: string;
    photos: PhotoData[];
}

export default function AlbumDetail() {
    const navigate = useNavigate();
    const { date } = useParams<{ date: string }>();
    const [album, setAlbum] = useState<AlbumData | null>(null);
    const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    useEffect(() => {
        if (!date) return;
        
        // ローカルストレージからアルバムデータを取得
        const storedAlbums = localStorage.getItem('albums');
        if (storedAlbums) {
            const parsedAlbums: AlbumData[] = JSON.parse(storedAlbums);
            const targetAlbum = parsedAlbums.find(album => album.date === decodeURIComponent(date));
            
            // 古いデータ形式（File/preview）から新しい形式（Base64）への変換チェック
            if (targetAlbum && targetAlbum.photos.length > 0) {
                const firstPhoto = targetAlbum.photos[0] as any;
                if (firstPhoto.file || firstPhoto.preview) {
                    // 古い形式のデータが残っている場合は空にする
                    console.warn('古い形式のアルバムデータが検出されました。データをクリアします。');
                    const updatedAlbum = { ...targetAlbum, photos: [] };
                    setAlbum(updatedAlbum);
                    
                    // ローカルストレージも更新
                    const updatedAlbums = parsedAlbums.map(a => 
                        a.date === targetAlbum.date ? updatedAlbum : a
                    );
                    localStorage.setItem('albums', JSON.stringify(updatedAlbums));
                } else {
                    setAlbum(targetAlbum);
                }
            } else {
                setAlbum(targetAlbum || null);
            }
        }
    }, [date]);

    const handleBack = () => {
        navigate('/album-home');
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleAddPhotos = () => {
        // ファイル選択用のinput要素を作成
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*';
        
        input.onchange = async (event) => {
            const files = (event.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                // ファイルをBase64に変換
                const newPhotos = await Promise.all(
                    Array.from(files).map(async (file) => ({
                        name: file.name,
                        data: await convertFileToBase64(file),
                        size: file.size,
                        type: file.type
                    }))
                );

                // 既存のアルバムに直接写真を追加
                if (album) {
                    const updatedAlbum = {
                        ...album,
                        photos: [...album.photos, ...newPhotos]
                    };

                    // ローカルストレージを更新
                    const storedAlbums = localStorage.getItem('albums');
                    if (storedAlbums) {
                        const parsedAlbums: AlbumData[] = JSON.parse(storedAlbums);
                        const updatedAlbums = parsedAlbums.map(a => 
                            a.date === album.date ? updatedAlbum : a
                        );
                        localStorage.setItem('albums', JSON.stringify(updatedAlbums));
                        setAlbum(updatedAlbum);
                    }
                }
            }
        };
        
        input.click();
    };

    const handlePhotoSelect = (index: number) => {
        if (!isDeleteMode) return;
        
        setSelectedPhotos(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleDeleteMode = () => {
        setIsDeleteMode(!isDeleteMode);
        setSelectedPhotos([]);
    };

    const handleDeleteSelected = () => {
        if (!album || selectedPhotos.length === 0) {
            setIsDeleteMode(false);
            setSelectedPhotos([]);
            return;
        }

        // 選択した写真を削除
        const updatedPhotos = album.photos.filter((_, index) => !selectedPhotos.includes(index));
        const updatedAlbum = { ...album, photos: updatedPhotos };
        
        // ローカルストレージを更新
        const storedAlbums = localStorage.getItem('albums');
        if (storedAlbums) {
            const parsedAlbums: AlbumData[] = JSON.parse(storedAlbums);
            const updatedAlbums = parsedAlbums.map(a => 
                a.date === album.date ? updatedAlbum : a
            );
            localStorage.setItem('albums', JSON.stringify(updatedAlbums));
        }

        setAlbum(updatedAlbum);
        setSelectedPhotos([]);
        setIsDeleteMode(false);
    };

    if (!album) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.backBtn} onClick={handleBack}>
                        <img src={images.arrowBack} alt="戻る" />
                    </button>
                    <h1>アルバムが見つかりません</h1>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={handleBack}>
                    <img src={images.arrowBackBlack} alt="戻る" />
                </button>
                <h1>{album.date}</h1>
            </div>

            {album.photos.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>まだ写真がありません</p>
                    <Button 
                        className={styles.addFirstPhotoBtn} 
                        variant="blueButton"
                        onClick={handleAddPhotos}
                    >
                        写真を追加
                    </Button>
                </div>
            ) : (
                <>
                    <div className={styles.photoGrid}>
                        {album.photos.map((photo, index) => (
                            <div 
                                key={index} 
                                className={`${styles.photoItem} ${isDeleteMode ? styles.deleteModeItem : ''} ${selectedPhotos.includes(index) ? styles.selected : ''}`}
                                onClick={() => handlePhotoSelect(index)}
                            >
                                <img 
                                    src={photo.data} 
                                    alt={`写真 ${index + 1}`}
                                />
                                {isDeleteMode && (
                                    <div className={styles.selectOverlay}>
                                        {selectedPhotos.includes(index) && (
                                            <div className={styles.checkmark}>✓</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.btnWrap}>
                        {isDeleteMode ? (
                            <>
                                <Button 
                                    className={styles.cancelBtn} 
                                    variant="buttonOther"
                                    onClick={() => {
                                        setIsDeleteMode(false);
                                        setSelectedPhotos([]);
                                    }}
                                >
                                    キャンセル
                                </Button>
                                <Button 
                                    className={styles.deleteBtn} 
                                    variant="blueButton"
                                    onClick={handleDeleteSelected}
                                >
                                    選択写真削除
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    className={styles.deleteBtn} 
                                    variant="blueButton"
                                    onClick={handleDeleteMode}
                                >
                                    写真削除
                                </Button>
                                <Button 
                                    className={styles.addBtn} 
                                    variant="small" 
                                    onClick={handleAddPhotos}
                                >
                                    写真追加
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
