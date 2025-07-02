//キャラクター進化画面
import styles from "../styles/chara_evolution.module.scss";
import images from "../hooks/images";
export default function CharaEvolution() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.backImage} />
                <div className={styles.content}>
                    <div className={styles.evolution_text}>
                        <p>キャラクター名が</p>
                        <p>進化しそう...</p>
                    </div>

                    {/*キャラクター*/}
                    <div className={styles.image_placeholder}>
                        <img src={images.radialCircle} alt="背景の放射状" className={styles.adial_circle}/>
                        <img src={images.characterEgg} alt="キャラクターたまご" className={styles.character_egg} />
                    </div>
                </div>
        
            </div>


        </>
    );
};
