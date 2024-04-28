import styles from './info-order.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function InfoOrder() {
    const { number: number } = useParams();
    return (
        <section className={`${styles.main}`}>
            <h1 className={`${styles.order} text text_type_digits-default mt-20 mb-10`}>#{number}</h1>
            <h1 className={`text text_type_main-medium mb-3`}>Black Hole Singularity острый бургер</h1>
            <h2 className={`text text_type_main-medium mb-15 ${styles.composition}`}>Состав</h2>
            <ul className='mb-10'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className={`${styles.footer}`}>
                <p className={`text text_type_main-default text_color_inactive`}>Вчера, 13:50</p>
                <div className={`${styles.price}`}>
                    <p className={`text text_type_main-default`}>1234</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    );
}

export default InfoOrder;
