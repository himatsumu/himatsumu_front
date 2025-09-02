import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from '../styles/create_folder.module.scss';

export default function CreateFolder() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>('');

    const handleClose = () => {
        navigate('/album-home');
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleCreateFolder = () => {
        if (!selectedDate) {
            alert('日付を選択してください');
            return;
        }

        // 既存のアルバムデータを取得
        const storedAlbums = localStorage.getItem('albums');
        const albums = storedAlbums ? JSON.parse(storedAlbums) : [];

        // 日付を / 区切りのフォーマットに変換 (YYYY-MM-DD → YYYY/MM/DD)
        const formattedDate = selectedDate.replace(/-/g, '/');

        // 新しいアルバムデータを追加
        const newAlbum = {
            date: formattedDate,
            photos: []
        };

        albums.push(newAlbum);

        // ローカルストレージに保存
        localStorage.setItem('albums', JSON.stringify(albums));

        // アルバムホーム画面に戻る
        navigate('/album-home');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>フォルダ作成</h1>
            </div>

            <div className={styles.dateSelectWrap}>
                <label htmlFor="date" className={styles.dateLabel}>
                    日付を選択してください
                </label>
                <input
                    type="date"
                    id="date"
                    className={styles.date}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className={styles.btnWrap}>
                <Button 
                    className={styles.cancelBtn} 
                    variant="buttonOther"
                    onClick={handleClose}
                >
                    キャンセル
                </Button>
                <Button 
                    className={styles.createBtn} 
                    variant="small"
                    onClick={handleCreateFolder}
                >
                    決定
                </Button>
            </div>
        </div>
    );
}
