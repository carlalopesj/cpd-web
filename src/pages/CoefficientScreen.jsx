import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; 
import styles from "./styles/CoefficientScreen.module.css"; 

export default function CoefficientScreen() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

   
    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchCoefficients = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("https://cpd-backend-production-a0cb.up.railway.app/api/production-coefficient", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    
                    const sortedData = result.sort((a, b) => b["Coeficiente de Rendimento"] - a["Coeficiente de Rendimento"]);
                    setData(sortedData);
                } else {
                    setError(result.message || "Erro ao buscar dados");
                    alert(result.message || "Erro ao buscar dados");
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError("Não foi possível conectar ao servidor.");
                alert("Erro na requisição");
            } finally {
                setLoading(false);
            }
        };

        fetchCoefficients();
    }, []);

    return (
        <div className={styles.container}>
            {}
            <button onClick={handleGoBack} className={styles.backButton}>
                <IoArrowBack size={24} />
            </button>
            
            {}
            <h1 className={styles.title}>Coeficiente de Rendimento</h1>

            {}
            {loading && <p className={styles.loadingText}>Carregando coeficientes...</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            
            {!loading && !error && (
                
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Coeficiente</th>
                                <th>Usuário</th>
                                <th>Nº da Caixa</th>
                                {}
                                <th>ID Caixa</th>
                                <th>ID Usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    
                                    <tr key={item["Id da Caixa"] || index}>
                                        <td data-label="Coeficiente">{item["Coeficiente de Rendimento"]}</td>
                                        <td data-label="Usuário">{item["Nome do Usuario"]}</td>
                                        <td data-label="Nº da Caixa">{item["Número da Caixa"]}</td>
                                        <td data-label="ID Caixa">{item["Id da Caixa"]}</td>
                                        <td data-label="ID Usuário">{item["Id do Usuário"]}</td>
                                    </tr>
                                ))
                            ) : (
                                
                                <tr>
                                    <td colSpan="5">Nenhum coeficiente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}