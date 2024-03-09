import styles from "./burger-constructor.module.css";
import { useState, useCallback, useMemo } from "react";
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { useDispatch, useSelector } from "react-redux";
import { addIngredient } from "../../services/actions";
import { addOrder } from "../../services/actions/order";
import { getIngredients, getOrderNumber } from "../../routes";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const data = useSelector(getIngredients);
    const orderNumber = useSelector(getOrderNumber);
    const [isModalOpen, setModalOpen] = useState(false);

    const onDropHandler = useCallback((item) => {
        dispatch(addIngredient(item));
    }, [dispatch])

    const [{ isOver }, dropRef] = useDrop({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const [{ isOverBun }, dropRefBun] = useDrop({
        accept: "bun",
        drop(item) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOverBun: monitor.isOver()
        })
    });

    const item = {
        name: 'Добавить ингредиент',
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        price: 0
    }

    const totalPrice = useMemo(() => {
        let sum = 0;
        if (Array.isArray(data)) {
            data.forEach(item => sum += item.price)
        }
        return sum
    }, [data]);

    const handleOpenModal = () => {
        console.log(data)
        if (data.length > 1) dispatch(addOrder(data));
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const borderColor = isOver ? "#00cccc" : "#131316";
    const borderColorBun = isOverBun ? "#4c4cff" : "#131316";

    return (
        <div className={`mt-25`}>
            <div className={styles.container}>
                <>
                    <div className={styles.item} ref={dropRefBun} style={{ borderColor: borderColorBun }}>
                        {data && data.length > 0 && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={data[0].name + " (верх)"}
                                price={data[0].price}
                                thumbnail={data[0].image}
                            />
                        )}
                    </div>
                    <div className={styles.scrollable} ref={dropRef} style={{ borderColor }}>
                        {data && data.length > 1 ? data.slice(1).map((item, index) => (
                            <div className={`${styles.scrollable_item} mr-2`} key={item.uniqId}>
                                <BurgerConstructorItem item={item} index={index} isLocked={false} />
                            </div>
                        )) : (
                            <div className={`${styles.scrollable_item} mr-2`}>
                                <BurgerConstructorItem item={item} index={1} isLocked={true} />
                            </div>
                        )}
                    </div>
                    <div className={styles.item} style={{ borderColor: borderColorBun }}>
                        {data && data.length > 0 && <ConstructorElement type="bottom" isLocked={true} text={data[0].name + " (низ)"} price={data[0].price} thumbnail={data[0].image} />}
                    </div>
                </>
            </div>
            <div className={`${styles.order} mt-10 mr-5`}>
                <div className={`${styles.order_details} mr-10`}>
                    <h1 className={`mr-2`}>{totalPrice}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" onClick={handleOpenModal} >
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && orderNumber && (
                <Modal onClick={handleCloseModal}>
                    <OrderDetails _id={orderNumber} />
                </Modal>
            )}
        </div>
    )
}

export default BurgerConstructor;