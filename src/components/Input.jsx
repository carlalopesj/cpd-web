import styles from './styles/Input.module.css'

const Input = ({ placeholder, value, onChange, type = "text" }) => {
    
    return (
        <input 
            className={styles.input} 
            placeholder={placeholder} 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            type={type} 
            autoComplete="off">
        </input>
    );
};

export default Input;