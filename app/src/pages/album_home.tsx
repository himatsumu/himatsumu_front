import { Button } from '../components/Button';
import images from '../hooks/images';
import styles from '../styles/album_home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface AlbumData {
    date: string;
    photos: {
        file: File;
        preview: string;
        name: string;
    }[];
}

export default function AlbumHome() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState<AlbumData[]>([]);
    const [selectedAlbums, setSelectedAlbums] = useState<number[]>([]);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [sortOrder, setSortOrder] = useState<'降順' | '昇順'>('降順');

    useEffect(() => {
        // ローカルストレージからアルバムデータを取得
        const storedAlbums = localStorage.getItem('albums');
        if (storedAlbums) {
            const parsedAlbums = JSON.parse(storedAlbums);
            setAlbums(parsedAlbums);
        }
    }, []);
    
    // ソートされたアルバムを計算
    const sortedAlbums = [...albums].sort((a, b) => {
        const dateA = new Date(a.date.replace(/\//g, '-'));
        const dateB = new Date(b.date.replace(/\//g, '-'));
        
        if (sortOrder === '降順') {
            return dateB.getTime() - dateA.getTime(); // 新しい日付が上
        } else {
            return dateA.getTime() - dateB.getTime(); // 古い日付が上
        }
    });

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as '降順' | '昇順');
    };

    const HandleClose = (() => {
        navigate("/friend-home");
    });

    const handleCreateFolder = () => {
        navigate("/create-folder");
    };

    const handleAlbumSelect = (index: number) => {
        if (!isDeleteMode) return;
        
        setSelectedAlbums(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleAlbumClick = (albumDate: string, originalIndex: number) => {
        if (isDeleteMode) {
            // 削除モードの場合は選択処理
            handleAlbumSelect(originalIndex);
        } else {
            // 通常モードの場合は詳細画面に遷移
            navigate(`/album-detail/${encodeURIComponent(albumDate)}`);
        }
    };

    const handleDeleteMode = () => {
        setIsDeleteMode(!isDeleteMode);
        setSelectedAlbums([]);
    };

    const handleDeleteSelected = () => {
        if (selectedAlbums.length === 0) {
            // キャンセル
            setIsDeleteMode(false);
            setSelectedAlbums([]);
            return;
        }
        
        const updatedAlbums = albums.filter((_, index) => !selectedAlbums.includes(index));
        setAlbums(updatedAlbums);
        localStorage.setItem('albums', JSON.stringify(updatedAlbums));
        setSelectedAlbums([]);
        setIsDeleteMode(false);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.CloseBtnWrap} onClick={HandleClose}>
                        <img src={images.closeButton}  alt="戻る" />
                    </button>
                    <h1>アルバム</h1>
                </div>
                <select className={styles.lineWrap} value={sortOrder} onChange={handleSortChange}>
                    <option value="降順">降順</option>
                    <option value="昇順">昇順</option>
                </select>
                <ul className={styles.albumList}>
                    {sortedAlbums.map((album, index) => {
                        return (
                            <li 
                                key={index} 
                                className={`${styles.albumItem} ${isDeleteMode ? styles.deleteModeItem : ''} ${selectedAlbums.includes(index) ? styles.selected : ''} ${!isDeleteMode ? styles.clickable : ''}`}
                                onClick={() => handleAlbumClick(album.date, index)}
                            >
                                <img src={images.albumFolder} alt="アルバムフォルダー" />
                                <div className={styles.albumInfo}>
                                    <p>{album.date}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className={styles.btnWrap}>
                    {isDeleteMode ? (
                        <>
                            <Button 
                                className={styles.cancelBtn} 
                                variant="buttonOther"
                                onClick={() => {
                                    setIsDeleteMode(false);
                                    setSelectedAlbums([]);
                                }}
                            >
                                キャンセル
                            </Button>
                            <Button 
                                className={styles.deleteBtn} 
                                variant="blueButton"
                                onClick={handleDeleteSelected}
                            >
                                選択フォルダ削除
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button 
                                className={styles.deleteBtn} 
                                variant="blueButton"
                                onClick={handleDeleteMode}
                            >
                                フォルダ削除
                            </Button>
                            <Button className={styles.createBtn} variant="small" onClick={handleCreateFolder}>
                                フォルダ作成
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}