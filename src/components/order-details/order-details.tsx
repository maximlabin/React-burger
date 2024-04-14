import styles from './order-details.module.css';
import icon from '../../images/done.svg';

function OrderDetails({ _id }: { _id: string }) {
    return (
        <section className={`${styles.main}`}>
            <h1 className={`${styles.order} text_type_digits-large mt-20 mb-8`}>{_id}</h1>
            <p className={`${styles.order_id} text_type_main-medium mb-15`}>идентификатор заказа</p>
            <img src={icon} alt="Заказ готов" />
            <p className={`text text_type_main-default mt-15 mb-8`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
        </section>
    );
}

export default OrderDetails;