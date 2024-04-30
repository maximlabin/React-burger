import styles from './info-order.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { WS_CONNECTION_START } from '../../services/constants';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useEffect, useState } from 'react';
import { useSelector } from '../../hooks/useSelector';
import { getData } from '../../routes';
import dataConverter from '../../utils/dataConverter';
import { TIngredientItem } from '../../services/types/data';
import { getFoundOrder } from '../../services/actions/foundorder';

function InfoOrder() {
    const { number: numberString } = useParams();
    const dispatch = useAppDispatch();

    const [connectionEstablished, setConnectionEstablished] = useState(false);
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        setConnectionEstablished(true);
        return () => {
            if (connectionEstablished) {
                dispatch({ type: WS_CONNECTION_START });
            }
        }
    }, [dispatch, connectionEstablished]);

    const order = useSelector((state) => state.ws.orders);
    let price = 0;
    const foundOrder = order.orders.find(order => order.number as unknown as string == numberString);
    if (foundOrder !== undefined) {
        if (numberString) dispatch(getFoundOrder(numberString))
    }
    const data = useSelector(getData).data as TIngredientItem[];
    let icons: string[] = [];
    let names: string[] = [];
    let prices: number[] = [];
    if (foundOrder) {
        foundOrder.ingredients.forEach((item) => {
            const foundIngredient = data.find((ingredient: TIngredientItem) => ingredient._id === item);
            if (!foundIngredient) return
            price += foundIngredient.price || 0;
            icons.push(foundIngredient.image_mobile);
            names.push(foundIngredient.name);
            prices.push(foundIngredient.price);
        });
    }
    const statusValue = (status: 'created' | 'done' | 'pending') => {
        let text = '';
        switch (status) {
            case 'created':
                text = 'Создан';
                break;
            case 'pending':
                text = 'Готовится';
                break;
            case 'done':
                text = 'Выполнен';
                break;
            default:
        }
        return text;
    }

    if (!foundOrder) {
        return <h1 className='text text_type_main-medium'>Заказ не найден</h1>
    } else {
        return (
            <section className={`${styles.main}`}>
                <h1 className={`${styles.order} text text_type_digits-default mt-20 mb-10`}>#{numberString}</h1>
                <h1 className={`text text_type_main-medium mb-3`}>Black Hole Singularity острый бургер</h1>
                <h2 className={`text text_type_main-medium ${styles.composition}`}>Состав</h2>
                <h3 className={`text text_type_main-default mb-15 mt-3 ${styles.status}`}>{statusValue(foundOrder.status)}</h3>
                <ul className={`mb-10 ${styles.list_order}`}>
                    {
                        icons.map((icon, index) => {
                            return (
                                <li key={index} className={`ml-3 mr-6 ${styles.list_item}`}>
                                    <div className={styles.list_item_icon}>
                                        <img src={icon} className={styles.icon} alt="ingredient" />
                                        <p className={`text text_type_main-default ${styles.list_item_text}`}>{names[index]}</p>
                                    </div>
                                    <p className={`text text_type_main-default ${styles.list_item_text}`}>{prices[index]}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={`${styles.footer}`}>
                    <p className={`text text_type_main-default text_color_inactive`}>{dataConverter(foundOrder.createdAt)}</p>
                    <div className={`${styles.price}`}>
                        <p className={`text text_type_main-default`}>{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>
        );
    }
}

export default InfoOrder;
