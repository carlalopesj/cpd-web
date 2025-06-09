import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CoefficientScreen.module.css";

export default function CoefficientScreen() {
    const navigate = useNavigate();
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(false);

    const fetchCoefficients = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://cpd-backend-shcz.onrender.com/api/production-coefficient", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setData(result);
            } else {
                alert(result.message || "Erro ao buscar dados");
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            alert("Erro na requisição");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoefficients();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Coeficientes</h1>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Coeficiente de Rendimento</th>
                            <th>Id da Caixa</th>
                            <th>Id do Usuário</th>
                            <th>Nome do Usuário</th>
                            <th>Número da Caixa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item["Id da Caixa"] || index}>
                                <td>{item["Coeficiente de Rendimento"]}</td>
                                <td>{item["Id da Caixa"]}</td>
                                <td>{item["Id do Usuário"]}</td>
                                <td>{item["Nome do Usuario"]}</td>
                                <td>{item["Número da Caixa"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
