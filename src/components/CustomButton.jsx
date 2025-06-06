import styles from './styles/CustomButton.module.css'

const CustomButton = ({text, onClick, style}) => {
    return (
        <button className={`${styles.button} ${style || ""}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default CustomButton;