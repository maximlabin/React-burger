import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import BurgerIngridientItem from '../burger-ingridient-item/burger-ingridient-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function BurgerIngredients(props) {
    const data = props.ingredients.data;
    const tabs = [
        {
            id: 1,
            name: 'bun',
            title: 'Булки',
        },
        {
            id: 2,
            name: 'sauce',
            title: 'Соусы',
        },
        {
            id: 3,
            name: 'main',
            title: 'Начинки',
        },
    ];
    const [current, setCurrent] = useState('bun');

    const handleTab = (item) => {
        let currentTab = document.getElementById(item.name);
        if (current !== item.name) {
            currentTab.scrollIntoView({ behavior: 'smooth' });
        }
        setCurrent(item.name);
    };

    return (
        <>
            <section className={`${styles.item}`}>
                {
                    tabs.map((item) => (
                        <Tab
                            value={item.name}
                            key={item.id}
                            onClick={() => handleTab(item)}
                            active={current === item.name}
                        >{item.title}</Tab>
                    ))
                }
            </section>
            <div className={`${styles.scrollable} mt-10`}>
                {
                    tabs.map(item => (
                        <section key={item.id} id={item.name}>
                            <h1 className={`${styles.text} text text_type_main-medium`}>{item.title}</h1>
                            <ul className={`${styles.container} pl-4 pr-4 pb-10 pt-6`}>
                                {
                                    data.filter(el => item.name === el.type).map(info => (
                                        <BurgerIngridientItem key={info._id} data={info} />
                                    ))
                                }
                            </ul>
                        </section>
                    ))
                }

            </div>
        </>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default BurgerIngredients;