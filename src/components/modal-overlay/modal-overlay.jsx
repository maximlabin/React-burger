import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const modalOverlay = document.getElementById("modal");

function ModalOverlay({ onClick, children }) {
    if (modalOverlay) {
        return ReactDOM.createPortal(
            (
                <div className={styles.overlay} onClick={onClick}>
                    {children}
                </div>
            ),
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

export default ModalOverlay;