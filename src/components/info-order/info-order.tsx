import styles from './info-order.module.css';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/constants';
import { useAppDispatch } from '../../hooks/useDispatch';
import { useEffect, useState } from 'react';
import { useSelector } from '../../hooks/useSelector';
import { getData } from '../../routes';
import dataConverter from '../../utils/dataConverter';
import { TIngredientItem } from '../../services/types/data';
import { getFoundOrder } from '../../services/actions/foundorder';
import { useLocation } from 'react-router-dom';

function InfoOrder() {
    const location = useLocation();
    const { number: numberString } = useParams();
    const state = location.state;
    const dispatch = useAppDispatch();

    const [connectionEstablished, setConnectionEstablished] = useState(false);
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            if (connectionEstablished) {
                dispatch({ type: WS_CONNECTION_CLOSED });
            }
        }
    }, [connectionEstablished]);

    const order = useSelector((state) => state.ws.orders);
    let price = 0;
    let foundOrder = order.orders.find(order => order.number as unknown as string == numberString);
    if (foundOrder === undefined) {
        if (numberString) {
            dispatch(getFoundOrder(numberString));
        }
    }
    const extraOrder = useSelector((state) => state.foundOrder.foundOrder.orders[0]);
    if (extraOrder) {
        foundOrder = extraOrder;
    }

    const data = useSelector(getData).data as TIngredientItem[];
    let icons: string[] = [];
    let names: string[] = [];
    let prices: number[] = [];

    let bun: boolean = true;
    if (foundOrder) {
        foundOrder.ingredients.forEach((item) => {
            const foundIngredient = data.find((ingredient: TIngredientItem) => ingredient._id === item);
            if (!foundIngredient) return
            if (foundIngredient.type === 'bun' && bun) {
                price += foundIngredient.price * 2 || 0;
                bun = false;
            } else if (foundIngredient.type !== 'bun') {
                price += foundIngredient.price || 0;
            }
            console.log(price, foundIngredient.type);
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
            <section className={`pb-10 ${styles.main}`}>
                <h1 className={`${state?.backgroundLocation ? 'mt-4 mb-7' : `mt-20 mb-10 ${styles.order}`} text text_type_digits-default`}>#{numberString}</h1>
                <h1 className={`text text_type_main-medium mb-3 ${styles.name}`}>{foundOrder.name}</h1>
                <h3 className={`text text_type_main-default mb-15 mt-3 ${styles.status}`}>{statusValue(foundOrder.status)}</h3>
                <h2 className={`text text_type_main-medium ${styles.composition}`}>Состав</h2>
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
