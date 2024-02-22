import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
function ModalOverlay({ onClick, children }) {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;