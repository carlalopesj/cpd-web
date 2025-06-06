import {useEffect, useState} from 'react'
import styles from './styles/Logo.module.css'

const Logo = ({ style }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
    }, []);


    return (
        <div className={`${styles.logoContainer} ${style || ""}`}>
            {loading ? (
                <div className={styles.spinner}></div>
            ) : (
                <img src='./assets/logo.png' alt='Logo CPD' className={styles.logo} />
            )}

        </div>
    );
};

export default Logo;