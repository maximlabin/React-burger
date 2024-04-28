import styles from './orders-list.module.css';
//import dataTransform from '../../utils/dataTransform.ts';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';

function OrdersInfo({ showStatus }: { showStatus: boolean }) {
    const { auth } = useSelector((store: RootState) => store.user);
    const { _id } = useParams();
    const location = useLocation();
    const ingredients = [{
        _id: '60d3b41abdacab0026a733c7',
        name: 'Краторная булка N-200i',
        price: '1255',
        type: 'bun',
        number: 2412341,
    },
    {
        _id: '60d3b41abdacab0026a733c78',
        name: 'Краторная булка N-200i',
        price: '1255',
        type: 'bun',
        number: 124124,
    }]
    return (
        <div className={styles.main}>
            {
                ingredients && ingredients.map((ingredient) => {
                    const redirectPath = location.pathname.includes('/feed') ? `/feed/${ingredient._id}` : `${ingredient._id}`;
                    return (

                        <Link to={redirectPath} key={ingredient._id} className={`pr-6 pl-6 mb-4 ${styles.item}`}>
                            <div className={`mb-6 mt-6 ${styles.title}`}>
                                <h2 className='text text_type_digits-default'>#{ingredient.number}</h2>
                                <h2 className='text text_type_main-default text_color_inactive'>I+8GTH</h2>
                            </div>
                            <h1 className={`text text_type_main-medium ${styles.ingredient}`}>{ingredient.name}</h1>
                            <div className={`mb-6 ${styles.order_price}`}>
                                <p className={styles.text}>{ingredient.name}</p>
                                <div className={styles.price}>
                                    <CurrencyIcon type="primary" />
                                    <p className='text text_type_digits-default'>{ingredient.price}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })


            }
        </div>
    )
}

export default OrdersInfo;