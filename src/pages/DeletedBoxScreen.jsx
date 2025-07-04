import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaUndo } from "react-icons/fa";
import Modal from "../components/Modal";
import ModalImage from "../components/ModalImage";
import styles from "./styles/DeletedBoxScreen.module.css";

export default function DeletedBoxesScreen() {
    const navigate = useNavigate();
    const [boxes, setBoxes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [boxToRestore, setBoxToRestore] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        setIsImageModalOpen(false);
    };

    const fetchDeletedBoxes = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://192.168.0.5:5000/api/boxreport/deleted", {
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
                setError(result.message || "Erro ao buscar caixas deletadas.");
            }
        } catch (err) {
            setError("Não foi possível conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeletedBoxes();
    }, []);

    const restoreClick = (id) => {
        setBoxToRestore(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setBoxToRestore(null);
    };

    const confirmRestore = async () => {
        if (!boxToRestore) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://192.168.0.5:5000/api/${boxToRestore}/restore`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert("Caixa restaurada com sucesso!");
                setBoxes(boxes.filter(box => box.id !== boxToRestore));
            } else {
                const result = await response.json();
                alert(result.message || result.error || "Falha ao restaurar a caixa.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro de conexão ao tentar restaurar a caixa.");
        } finally {
            closeModal();
        }
    };

    return (
        <div className={styles.container}>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmRestore}
                message={`Deseja restaurar a caixa de ID ${boxToRestore}?`}
                confirmText="Sim, Restaurar"
                cancelText="Não, Cancelar"
            />

            <ModalImage
                isOpen={isImageModalOpen}
                imageUrl={selectedImage}
                onClose={closeImageModal}
            />

            <button onClick={handleGoBack} className={styles.backButton}>
                <IoArrowBack size={24} />
            </button>

            <h1 className={styles.title}>Caixas Deletadas</h1>

            {!loading && !error && (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Foto</th>
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
                                        <td data-label="Foto">
                                            {box.photo ? (
                                                <img
                                                    src={box.photo}
                                                    alt="Foto da caixa"
                                                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", cursor: "pointer" }}
                                                    onClick={() => openImageModal(box.photo)}
                                                />
                                            ) : (
                                                <span>Sem foto</span>
                                            )}
                                        </td>
                                        <td data-label="Nº da Caixa">{box.box_number}</td>
                                        <td data-label="Marca">{box.brand}</td>
                                        <td data-label="Coeficiente">{box.coefficient}</td>
                                        <td data-label="Status">{box.status}</td>
                                        <td data-label="Etapa">{box.stage}</td>
                                        <td data-label="Ações">
                                            <button
                                                onClick={() => restoreClick(box.id)}
                                                className={styles.restoreButton}
                                            >
                                                <FaUndo color="green" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Nenhuma caixa deletada encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {loading && <p>Carregando caixas deletadas...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
