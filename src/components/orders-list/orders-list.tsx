import styles from './orders-list.module.css';
import dataConverter from '../../utils/dataConverter';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { TIngredientItem, TOrder } from '../../services/types/data';
import { getData } from '../../routes'

function OrdersInfo({ showStatus, orderList }: { showStatus: boolean, orderList: Array<TOrder> }) {
    const data = useSelector(getData).data as TIngredientItem[];
    const location = useLocation();
    return (
        <div className={styles.main}>
            {
                orderList && orderList.map((ingredient) => {
                    const redirectPath = location.pathname.includes('/feed') ? `/feed/${ingredient.number}` : `${ingredient.number}`;

                    let pictures: string[] = [];
                    let price = 0;
                    let bunAdded = false;

                    ingredient.ingredients.forEach((item) => {
                        const foundIngredient = data.find((ingredient: TIngredientItem) => ingredient._id === item);
                        if (!foundIngredient) return
                        if (!bunAdded) {
                            price += foundIngredient.price || 0;
                            pictures.push(foundIngredient.image_mobile);
                            bunAdded = true;
                        } else if (foundIngredient.type !== 'bun') {
                            pictures.push(foundIngredient.image_mobile);
                            price += foundIngredient.price || 0;
                        }
                    });
                    let number = pictures.length;
                    pictures = pictures.slice(0, 5);
                    const showMore = pictures.length >= 5;
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
                    return (
                        <Link to={redirectPath} key={ingredient._id} className={`pr-6 pl-6 mb-4 ${styles.item}`}>
                            <div className={`mb-6 mt-6 ${styles.title}`}>
                                <h2 className='text text_type_digits-default'>#{ingredient.number}</h2>
                                <h2 className='text text_type_main-default text_color_inactive'>{dataConverter(ingredient.createdAt)}</h2>
                            </div>
                            <h1 className={`text text_type_main-medium ${styles.ingredient}`}>{ingredient.name}</h1>
                            {
                                showStatus === true && <p className={`text text_type_main-default ${styles.status}`}>{statusValue(ingredient.status)}</p>
                            }
                            <div className={`mb-6 ${styles.order_price}`}>
                                <div className={styles.ingredient_picture}>

                                    {
                                        pictures.map((item, index) => (
                                            index < 5 && <img src={item} alt={item} key={index} className={index === 4 && showMore ? `${styles.last_img}` : `${styles.img}`} />
                                        )
                                        )
                                    }
                                    {
                                        showMore && <p className={`text text-type-main ${styles.more}`}>+{number - 5}</p>
                                    }

                                </div>
                                <div className={styles.price}>
                                    <CurrencyIcon type="primary" />
                                    <p className='text text_type_digits-default'>{price || 0}</p>
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