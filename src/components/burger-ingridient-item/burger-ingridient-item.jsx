import React from "react";
import styles from "./burger-ingridient-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal'
import { useState } from 'react';
import IngridientDetails from "../ingridient-details/ingridient-details";
import PropTypes from 'prop-types';


function BurgerIngridientItem({ data }) {
    const [count, setCount] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setCount(count + 1);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <li className={`${styles.item} mb-8`} onClick={handleOpenModal}>
                <Counter count={count} size="default" extraClass="m-1" />
                <img className={`mr-4 ml-4`} src={data.image} alt={data.name} />
                <span className={`${styles.price} mt-1 mb-1 text_type_main-default`}>
                    {data.price}<CurrencyIcon type="primary" />
                </span>
                <h1 className={`${styles.name} text_type_main-default`}>{data.name}</h1>
            </li>
            {isModalOpen && (
                <Modal onClick={handleCloseModal} >
                    <IngridientDetails data={data} head={'Детали ингредиента'} />
                </Modal>
            )}
        </>

    );
}

BurgerIngridientItem.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default BurgerIngridientItem;