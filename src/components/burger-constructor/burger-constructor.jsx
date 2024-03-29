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
import { getIngredients, getOrderNumber, getBun } from "../../routes";
import { useNavigate } from "react-router-dom";
import uniqid from 'uniqid';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const data = useSelector(getIngredients);
    const bun = useSelector(getBun);
    const orderNumber = useSelector(getOrderNumber);
    const [isModalOpen, setModalOpen] = useState(false);
    const onDropHandler = useCallback((item) => {
        dispatch(addIngredient(item));
    }, [dispatch])
    const { auth } = useSelector(store => store.user);
    const navigate = useNavigate();

    const [{ isOver }, dropRef] = useDrop({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const [{ isOverBun }, dropRefTopBun] = useDrop({
        accept: "bun",
        drop(item) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOverBun: monitor.isOver()
        })
    });

    const [{ isOverBottomBun }, dropRefBottomBun] = useDrop({
        accept: "bun",
        drop(item) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOverBottomBun: monitor.isOver()
        })
    });

    const item = {
        name: 'Выберите начинку',
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        price: 0,
        uniqId: uniqid(),
    }

    const totalPrice = useMemo(() => {
        let sum = 0;
        if (Array.isArray(data)) {
            data.forEach(item => sum += item.price)
        }
        return sum + bun.price;
    }, [data, bun.price]);

    const handleOpenModal = () => {
        if (!auth) {
            navigate('/login');
        } else {
            dispatch(addOrder([bun, bun, ...data]));
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const borderColor = isOver ? "#00cccc" : "#131316";
    const borderColorTopBun = isOverBun ? "#4c4cff" : "#131316";
    const borderColorBottomBun = isOverBottomBun ? "#4c4cff" : "#131316";

    return (
        <div className={`mt-25`}>
            <div className={styles.container}>
                <>
                    <div className={styles.item} ref={dropRefTopBun} style={{ borderColor: borderColorTopBun }}>
                        {bun && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bun.name + " (верх)"}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        )}
                    </div>
                    <div className={styles.scrollable} ref={dropRef} style={{ borderColor }}>
                        {data && data.length >= 1 ? data.map((item, index) => (
                            <div className={`${styles.scrollable_item} mr-2`} key={item.uniqId}>
                                <BurgerConstructorItem item={item} index={index} isLocked={false} />
                            </div>
                        )) : (
                            <div className={`${styles.scrollable_item} mr-2`}>
                                <BurgerConstructorItem item={item} index={1} isLocked={true} />
                            </div>
                        )}
                    </div>
                    <div className={styles.item} style={{ borderColor: borderColorBottomBun }} ref={dropRefBottomBun}>
                        {bun && <ConstructorElement type="bottom" isLocked={true} text={bun.name + " (низ)"} price={bun.price} thumbnail={bun.image} />}
                    </div>
                </>
            </div>
            <div className={`${styles.order} mt-10 mr-5`}>
                <div className={`${styles.order_details} mr-10`}>
                    <h1 className={`mr-2`}>{totalPrice}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" onClick={handleOpenModal} disabled={bun._id ? false : true}>
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