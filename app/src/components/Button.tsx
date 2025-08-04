import styles from "../styles/common.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {  //通常の <button> に渡せるすべての属性を使えるようにしてる 例: onClick, type, disabled
    children: React.ReactNode;                                  //ボタンの中に表示する要素（テキストやアイコンなど）
    variant: keyof typeof buttonStyle;                          //buttonStyleのキーだけを型にする
};

//button共通じゃない
const buttonStyle = {
    common: `${styles.buttonCommon}`,
    small: `${styles.buttonCommon} ${styles.buttonNomal}`,
    blueButton: `${styles.buttonCommon} ${styles.buttonNoQuest}`,
    buttonOther: `${styles.buttonCommon} ${styles.buttonOther}`,
    buttonLogin: `${styles.buttonLogin} ${styles.buttonCommon}`,
    buttonUserLogin: `${styles.buttonUserLogin} ${styles.buttonCommon}`,
    buttonCreate: `${styles.buttonCommon} ${styles.buttonCreate}`,
    buttonAddRequest: `${styles.buttonAddRequest}`,
    buttonDelete: `${styles.buttonDelete}`
} as const

//共通のボタンデザイン
export const Button = ({ children, variant, className = "", ...props }: Props) => {
    return (
        <button className={`rounded-md ${styles["buttonCommon"]} ${variant ? buttonStyle[variant] : ""} ${className}`}
            {...props}  //onclickとかbuttonの属性を渡せるようにする
        >
            {children}
        </button>
    )
}