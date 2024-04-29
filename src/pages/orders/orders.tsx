import ProfileNav from '../../components/profile-nav/profile-nav';
import styles from './orders.module.css';
import OrdersInfo from '../../components/orders-list/orders-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';
import { WS_CONNECTION_CLOSED, WS_USER_CONNECTION_START } from '../../services/constants';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';


function Orders() {
    const dispatch = useAppDispatch();
    const orders = useSelector((state: RootState) => state.ws.orders);
    useEffect(() => {
        dispatch({ type: WS_USER_CONNECTION_START });
    }, [dispatch]);
    return (
        <div className={`${styles.root} pt-15`}>
            <ProfileNav />
            <div className={styles.orders}>
                <OrdersInfo orderList={orders.orders} showStatus={true} />
            </div>
        </div>
    )
}

export default Orders;