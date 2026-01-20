import React from 'react';
import styles from '../styles/NewsWidget.module.css';


interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <div className={styles.modalBody}>{children}</div>
        <button className={styles.modalClose} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;

