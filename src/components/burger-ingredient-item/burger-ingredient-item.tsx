import React from "react";
import styles from "./burger-ingridient-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { getCount } from "../../routes";
import { useLocation, Link } from "react-router-dom";
import { TIngredientItem } from "../../services/types/data";
function BurgerIngredientItem({ data }: { data: TIngredientItem }) {
    const count = useSelector(getCount(data));
    const location = useLocation();

    const [{ isDrag }, dragRef] = useDrag({
        type: data.type === 'bun' ? 'bun' : 'ingredient',
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });


    return (
        <>
            {!isDrag && (
                <li ref={dragRef} className={`mb-8`}>
                    <Link to={{
                        pathname: `/ingredients/${data._id}`,
                    }}
                        state={{ backgroundLocation: location }}
                        key={data._id}
                        className={styles.item}
                    >
                        <Counter count={count} size="default" extraClass="m-1" />
                        <img className={`mr-4 ml-4`} src={data.image} alt={data.name} />
                        <span className={`${styles.price} mt-1 mb-1 text_type_main-default`}>
                            {data.price}<CurrencyIcon type="primary" />
                        </span>
                        <h1 className={`${styles.name} text_type_main-default`}>{data.name}</h1>
                    </Link>
                </li>
            )}
        </>

    );
}

export default BurgerIngredientItem;