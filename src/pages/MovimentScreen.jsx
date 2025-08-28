import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./styles/MovimentScreen.module.css";

export default function MovimentScreen() {
    const navigate = useNavigate();
    const [moviments, setMoviments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoviment = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("https://cpd-backend-production-a0cb.up.railway.app/api/moviments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    
                    setMoviments(result);
                } else {
                    setError(result.message || "Erro ao buscar dados");
                    alert(result.message || "Erro ao buscar dados");
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
                setError("Não foi possível conectar ao servidor.");
                alert("Erro na requisição");
            } finally {
                setLoading(false);
            }
        };

        fetchMoviment();
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <button onClick={handleGoBack} className={styles.backButton}>
                <IoArrowBack size={24} />
            </button>
            <h1 className={styles.title}>Histórico de Movimentações</h1>

            {loading && <p className={styles.loadingText}>Carregando histórico...</p>}
            {error && <p className={styles.errorText}>{error}</p>}

            {!loading && !error && (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Data e Hora</th>
                                <th>Usuário</th>
                                <th>Estágio</th>
                                <th>Nº da Caixa</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moviments.length > 0 ? (
                                moviments.map((item) => (
                                    
                                    <tr key={item.id}>
                                        <td data-label="Data e Hora">{item["Data e Hora"]}</td>
                                        <td data-label="Usuário">{item["Usuário"]}</td>
                                        <td data-label="Estágio">{item["Estágio"]}</td>
                                        <td data-label="Nº da Caixa">{item["Nº da Caixa"]}</td>
                                        <td data-label="Observação">{item["Observação"]}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhuma movimentação encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}