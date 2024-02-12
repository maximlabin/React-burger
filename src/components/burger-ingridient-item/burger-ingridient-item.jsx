import React from "react";
import styles from "./burger-ingridient-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngridientItem({ data }) {
    return (
        <li className={`${styles.item} mb-8`}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img className={`mr-4 ml-4`} src={data.image} alt={data.name} />
            <span className={`${styles.price} mt-1 mb-1 text_type_main-default`}>{data.price}<CurrencyIcon type="primary" /></span>
            <h1 className={`${styles.name} text_type_main-default`}>{data.name}</h1>
        </li>
    );
}

export default BurgerIngridientItem;