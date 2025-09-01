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

    useEffect(() => {
        // ローカルストレージからアルバムデータを取得
        const storedAlbums = localStorage.getItem('albums');
        if (storedAlbums) {
            const parsedAlbums = JSON.parse(storedAlbums);
            setAlbums(parsedAlbums);
        }
    }, []);

    const HandleClose = (() => {
        navigate("/friend-home");
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.CloseBtnWrap} onClick={HandleClose}>
                        <img src={images.closeButton}  alt="戻る" />
                    </button>
                    <h1>アルバム</h1>
                </div>
                <select className={styles.lineWrap}>
                    <option value="降順">降順</option>
                    <option value="昇順">昇順</option>
                </select>
                <ul className={styles.albumList}>
                    {/* 既存のデモアルバム */}
                    <li>
                        <img src={images.albumFolder} alt="アルバムフォルダー" />
                        <p>2025/07/28</p>
                    </li>
                    {/* 新しく追加されたアルバム */}
                    {albums.map((album, index) => (
                        <li key={index} className={styles.albumItem}>
                            <img src={images.albumFolder} alt="アルバムフォルダー" />
                            <div className={styles.albumInfo}>
                                <p>{album.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.btnWrap}>
                    <Button className={styles.deleteBtn} variant="blueButton">
                        フォルダ削除
                    </Button>
                    <Button className={styles.createBtn} variant="small">
                        フォルダ作成
                    </Button>
                </div>
            </div>
        </>
    );
}