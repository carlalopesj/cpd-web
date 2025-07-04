import { useNavigate } from "react-router-dom";
import styles from "./styles/Dashboard.module.css"; 
import { IoArrowBack } from "react-icons/io5";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("profile_id");

        navigate("/");
    };

    return (
        <div className={styles.container}>
            <h1>Bem-vindo ao Sistema</h1>

            <div className={styles.buttonGroup}>
                <button
                    className={styles.button}
                    onClick={() => navigate("/coefficients")}
                >
                    <span className={styles.buttonText}>Coeficiente de Rendimento</span>
                </button>

                <button
                    className={styles.button}
                    onClick={() => navigate("/moviment")}
                >
                    <span className={styles.buttonText}>Movimentações</span>
                </button>

                <button
                    className={styles.button}
                    onClick={() => navigate("/boxes")}
                >
                    <span className={styles.buttonText}>Caixas</span>
                </button>

                <button
                    className={styles.button}
                    onClick={() => navigate("/boxesdeleted")}
                >
                    <span className={styles.buttonText}>Caixas Deletadas</span>
                </button>

                <button
                    className={styles.button}
                    onClick={() => navigate("/adduser")}
                >
                    <span className={styles.buttonText}>Adicionar Usuários</span>
                </button>
            </div>

            <button
                className={styles.backBtn}
                onClick={handleLogout}
            >
                <IoArrowBack size={24} color="black" />
            </button>
        </div>
    );
}
