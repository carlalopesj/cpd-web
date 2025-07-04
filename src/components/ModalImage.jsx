import styles from "./styles/ModalImage.module.css";

export default function ModalImage({ isOpen, imageUrl, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Imagem ampliada" className={styles.image} />
                <button className={styles.closeButton} onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}
