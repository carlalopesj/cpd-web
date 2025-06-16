import styles from "./Modal.module.css";

export default function Modal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            {/*Modal*/}
            <div className={styles.modalContent}>
                <p>{message}</p>
                <div className={styles.modalActions}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        Sim, Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}