import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import { PropsWithChildren } from 'react';
import { IModal } from '../../services/types/data';

function Modal({ onClick, children }: PropsWithChildren<IModal>) {
    const modalOverlay = document.getElementById("modal");

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClick();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [onClick]);

    if (modalOverlay) {
        return ReactDOM.createPortal(
            <ModalOverlay onClick={onClick}>
                <div className={`${styles.modal} pt-10`} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <button className={`${styles.closeIcon} mt-15 mr-10`}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    {children}
                </div>
            </ModalOverlay >,
            modalOverlay
        );
    } else {
        return null;
    }
}

export default Modal;