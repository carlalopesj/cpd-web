import styles from "./styles/Modal.module.css";

export default function Modal({ 
    isOpen, 
    onClose,
    onConfirm, 
    message, 
    confirmText = "Confirmar", 
    cancelText = "Cancelar" 
}) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <div className={styles.modalActions}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}