import styles from './burger-constructor.module.css'
import { useState } from "react";
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";

function BurgerConstructor(props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState(props.ingredients.data);

    let sum = data.reduce((total, item) => total + item.price, -2887);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const deleteElement = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    return (
        <div className={`mt-25`}>
            <div className={styles.container}>
                {data.length > 0 && (
                    <>
                        <div className={styles.item}>
                            <ConstructorElement type="top" isLocked={true} text={data[0].name + " (верх)"} price={data[0].price} thumbnail={data[0].image} />
                        </div>
                        <div className={styles.scrollable}>
                            {data.slice(1, -1).map(item => (
                                <div className={`${styles.scrollable_item} pl-8 mr-2`} key={item._id}>
                                    <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => deleteElement(data.indexOf(item))} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.item}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={data[0].name + " (низ)"}
                                price={data[0].price}
                                thumbnail={data[0].image}
                            />
                        </div>
                    </>
                )}
            </div>
            <div className={`${styles.order} mt-10`}>
                <div className={`${styles.order_details} mr-10`}>
                    <h1 className={`mr-2`}>{sum}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <Modal onClick={handleCloseModal}>
                    <OrderDetails id={Math.floor(Math.random() * 100000)} />
                </Modal>
            )}
        </div>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};

export default BurgerConstructor;