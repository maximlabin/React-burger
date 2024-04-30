import ProfileNav from '../../components/profile-nav/profile-nav';
import styles from './orders.module.css';
import OrdersInfo from '../../components/orders-list/orders-list';

import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_START } from '../../services/constants';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';


function Orders() {
    const dispatch = useAppDispatch();
    const orders = useSelector((state) => state.wsUser.orders);

    const [connectionEstablished, setConnectionEstablished] = useState(false);
    useEffect(() => {
        dispatch({ type: WS_USER_CONNECTION_START });
        setConnectionEstablished(true);
        return () => {
            if (connectionEstablished) {
                dispatch({ type: WS_USER_CONNECTION_CLOSED });
            }
        };
    }, [dispatch, connectionEstablished]);

    const reversedOrders = [...orders.orders].reverse();

    return (
        <div className={`${styles.root} pt-15`}>
            <ProfileNav />
            <div className={styles.orders}>
                <OrdersInfo orderList={reversedOrders} showStatus={true} />
            </div>
        </div>
    )
}

export default Orders;