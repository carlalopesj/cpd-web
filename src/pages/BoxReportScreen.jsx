import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import Modal from "./Modal"; 
import styles from "./BoxReportScreen.module.css";

export default function BoxReportScreen() {
    const navigate = useNavigate();
    const [boxes, setBoxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Modal
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [boxToDelete, setBoxToDelete] = useState(null); 

    const handleGoBack = () => { 
        navigate(-1); 
    }; 

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
                setBoxes(result.sort((a, b) => b.id - a.id)); 
            } else { 
                setError(result.message || "Erro ao buscar dados das caixas"); 
            } 
        } catch (err) { 
            setError("Não foi possível conectar ao servidor."); 
        } finally { 
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoxes();
    }, []);

    
    const deleteClick = (id) => {
        setBoxToDelete(id); 
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setBoxToDelete(null);
    };

    
    const confirmDelete = async () => {
        if (!boxToDelete) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`https://cpd-backend-shcz.onrender.com/api/${boxToDelete}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Caixa excluída com sucesso!");
                setBoxes(boxes.filter(box => box.id !== boxToDelete));
            } else {
                const result = await response.json();
                alert(result.message || result.error || "Falha ao excluir a caixa.");
            }
        } catch (err) {
            alert("Erro de conexão ao tentar excluir a caixa.");
        } finally {
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            {/*Modal*/}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message={`Você tem certeza que deseja excluir a caixa de ID ${boxToDelete}?`}
            />

            <button onClick={handleGoBack} className={styles.backButton}>
                <IoArrowBack size={24} />
            </button>
            
            <h1 className={styles.title}>Relatório de Caixas</h1>

            {/*Table*/}
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
                                <th>Ações</th> 
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
                                        <td data-label="Ações">
                                            {/*Button*/}
                                            <button
                                                onClick={() => deleteClick(box.id)}
                                                className={styles.deleteButton}
                                            >
                                                <FaTrash color="red" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhuma caixa encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}