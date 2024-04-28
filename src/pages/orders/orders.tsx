import ProfileNav from '../../components/profile-nav/profile-nav';
import styles from './orders.module.css';
import OrdersInfo from '../../components/orders-list/orders-list';

function Orders() {
    return (

        <div className={`${styles.root} pt-15`}>
            <ProfileNav />
            <div className={styles.orders}>
                <OrdersInfo showStatus={true} />
            </div>
        </div>
    )
}

export default Orders;