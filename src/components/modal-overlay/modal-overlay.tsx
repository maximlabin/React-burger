import { PropsWithChildren } from 'react';
import styles from './modal-overlay.module.css';
import { IModalOverlay } from '../../services/types/data';
function ModalOverlay({ onClick, children }: PropsWithChildren<IModalOverlay>) {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}

export default ModalOverlay;