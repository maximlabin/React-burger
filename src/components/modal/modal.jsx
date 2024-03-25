import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

function Modal({ onClick, children }) {
    const modalOverlay = document.getElementById("modal");

    useEffect(() => {
        const handleKeyPress = (event) => {
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
                <div className={`${styles.modal} pt-10`}>
                    <div className={styles.header}>
                        <button className={`${styles.closeIcon} mt-15 mr-10`}>
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    {children}
                </div>
            </ModalOverlay>,
            modalOverlay
        );
    } else {
        return null;
    }
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Modal;