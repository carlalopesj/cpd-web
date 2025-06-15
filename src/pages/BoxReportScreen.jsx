import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./BoxReport.module.css"; 

export default function BoxReportScreen() {
    const navigate = useNavigate();
    const [boxes, setBoxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchBoxes = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("https://cpd-backend-shcz.onrender.com/api/boxreport", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    const sortedData = result.sort((a, b) => b.id - a.id);
                    setBoxes(sortedData);
                } else {
                    const errorMessage = result.message || "Erro ao buscar dados das caixas";
                    setError(errorMessage);
                    alert(errorMessage);
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError("Não foi possível conectar ao servidor.");
                alert("Erro na requisição");
            } finally {
                setLoading(false);
            }
        };

        fetchBoxes();
    }, []);

    return (
        <div className={styles.container}>
            <button onClick={handleGoBack} className={styles.backButton}>
                <IoArrowBack size={24} />
            </button>
            
            <h1 className={styles.title}>Relatório de Caixas</h1>

            {loading && <p className={styles.loadingText}>Carregando caixas...</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            
            {!loading && !error && (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nº da Caixa</th>
                                <th>Marca</th>
                                <th>Coeficiente</th>
                                <th>Status</th>
                                <th>Etapa</th>
                                <th>Peso Bruto</th>
                                <th>Peso Limpo</th>
                                <th>Semana</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boxes.length > 0 ? (
                                boxes.map((box) => (
                                    <tr key={box.id}>
                                        <td data-label="Nº da Caixa">{box.box_number}</td>
                                        <td data-label="Marca">{box.brand}</td>
                                        <td data-label="Coeficiente">{box.coefficient}</td>
                                        <td data-label="Status">{box.status}</td>
                                        <td data-label="Etapa">{box.stage}</td>
                                        <td data-label="Peso Bruto">{box.box_weight}</td>
                                        <td data-label="Peso Limpo">{box.clean_weight}</td>
                                        <td data-label="Semana">{box.week}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Nenhuma caixa encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}