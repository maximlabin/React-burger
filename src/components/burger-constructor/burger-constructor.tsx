import styles from "./burger-constructor.module.css";
import { useState, useCallback, useMemo } from "react";
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { useSelector } from '../../hooks/useSelector';
import { addIngredient } from "../../services/actions";
import { addOrder } from "../../services/actions/order";
import { getIngredients, getOrderNumber, getBun } from "../../routes";
import { useNavigate } from "react-router-dom";
import uniqid from 'uniqid';
import { TIngredient } from '../../services/types/data';
import { useAppDispatch } from "../../hooks/useDispatch";
import { IBun } from '../../services/reducers/ingredient-reducer';
import { useEffect } from "react";

function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const data = useSelector(getIngredients);
    const bun = useSelector(getBun as () => IBun);
    const orderNumber = useSelector(getOrderNumber);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isOrderSent, setOrderSent] = useState(false);
    const onDropHandler = useCallback((item: TIngredient) => {
        dispatch(addIngredient(item));
    }, [dispatch])
    const { auth } = useSelector((store) => store.user);
    const navigate = useNavigate();

    const [{ isOver }, dropRef] = useDrop({
        accept: "ingredient",
        drop(item: TIngredient) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const [{ isOverBun }, dropRefTopBun] = useDrop({
        accept: "bun",
        drop(item: TIngredient) {
            onDropHandler(item);
        },
        collect: (monitor) => ({
            isOverBun: monitor.isOver()
        })
    });

    const [{ isOverBottomBun }, dropRefBottomBun] = useDrop({
        accept: "bun",
        drop(item: TIngredient) {
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
        _id: uniqid(),
        uniqId: uniqid(),
        type: 'main',
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
            const orderData = [bun, bun, ...data]
            dispatch(addOrder(orderData as TIngredient[]));
            setModalOpen(true);
            setOrderSent(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen && orderNumber) {
            setOrderSent(false);
        }
    }, [isModalOpen, orderNumber]);

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
                        {data && data.length >= 1 ? data.map((item: TIngredient, index: number) => (
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
            {isOrderSent && (
                <Modal onClick={() => setOrderSent(false)}>
                    <div className='mb-10 ml-5'>
                        <p className={`text text_type_digits-default`}>Ваш заказ готовится</p>
                    </div>
                </Modal>
            )}
            {isModalOpen && orderNumber && (
                <Modal onClick={handleCloseModal}>
                    <OrderDetails _id={orderNumber} />
                </Modal>
            )}
        </div>
    )
}

export default BurgerConstructor;