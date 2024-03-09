import React from "react";
import styles from "./burger-ingridient-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal'
import { useState } from 'react';
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedIngredient, clearSelectedIngredient } from '../../services/actions/modal';

const getCount = (item) => (state) => state.ingredients.addedIngredients.filter((ingredient) => ingredient._id === item._id).length;
function BurgerIngredientItem({ data }) {
    const dispatch = useDispatch()
    const [isModalOpen, setModalOpen] = useState(false);
    const count = useSelector(getCount(data));

    const [{ isDrag }, dragRef] = useDrag({
        type: data.type === 'bun' ? 'bun' : 'ingredient',
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const handleOpenModal = () => {
        dispatch(setSelectedIngredient(data));
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        dispatch(clearSelectedIngredient());
        setModalOpen(false);
    };

    return (
        <>
            {!isDrag && (
                <li ref={dragRef} className={`${styles.item} mb-8`} onClick={handleOpenModal}>
                    <Counter count={count} size="default" extraClass="m-1" />
                    <img className={`mr-4 ml-4`} src={data.image} alt={data.name} />
                    <span className={`${styles.price} mt-1 mb-1 text_type_main-default`}>
                        {data.price}<CurrencyIcon type="primary" />
                    </span>
                    <h1 className={`${styles.name} text_type_main-default`}>{data.name}</h1>
                </li>
            )}
            {isModalOpen && (
                <Modal onClick={handleCloseModal} >
                    <IngredientDetails data={data} head={'Детали ингредиента'} />
                </Modal>
            )}
        </>

    );
}

BurgerIngredientItem.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default BurgerIngredientItem;