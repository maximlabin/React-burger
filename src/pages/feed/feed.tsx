import styles from './feed.module.css';
import OrdersInfo from '../../components/orders-list/orders-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';
import { useAppDispatch } from '../../hooks/useDispatch';
import { WS_CONNECTION_START } from '../../services/constants';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/getIngredients';

function Feed() {
    const ingredients = useSelector((state: RootState) => state.ingredients);
    const dispatch = useAppDispatch();
    const orders = useSelector((state: RootState) => state.ws.orders);
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
    }, [dispatch, ingredients, orders]);
    console.log(orders.length)
    if (orders.length === 0 || Object.keys(ingredients).length === 0) {
        return <h1>Загрузка</h1>
    } else {
        return (
            <div className={styles.root}>
                <h1 className={'text text_type_main-large pt-8 pb-6'}>Лента заказов</h1>
                <div className={styles.feed}>
                    <div className={styles.orders}>
                        <OrdersInfo showStatus={false} />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.order_number}>
                            <div className={styles.ready}>
                                <h2 className='text text_type_main-medium mb-4'>Готовы:</h2>


                                <ul className={styles.list}>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                    <li className={`text text_type_digits-default ${styles.text_ready}`}>034533</li>
                                </ul>
                            </div>
                            <div className={styles.preparing}>
                                <h2 className='text text_type_main-medium mb-4'>В работе:</h2>
                                <ul className={styles.list}>
                                    <li className={`text text_type_digits-default ${styles.text_preparing}`}>034538</li>
                                    <li className={`text text_type_digits-default ${styles.text_preparing}`}>034538</li>
                                    <li className={`text text_type_digits-default ${styles.text_preparing}`}>034538</li>
                                </ul>
                            </div>
                        </div>
                        <div className='mt-15'>
                            <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
                            <h1 className={`text text_type_digits-large ${styles.shadow}`}>
                                28 752
                            </h1>
                        </div>
                        <div className='mt-15'>
                            <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
                            <h1 className={`text text_type_digits-large ${styles.shadow}`}>
                                138
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed;