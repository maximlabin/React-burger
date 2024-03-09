import { useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getData, isLoad } from "../../routes";

function BurgerIngredients() {
    const { data } = useSelector(getData);
    const { isLoading } = useSelector(isLoad);
    const [current, setCurrent] = useState('bun');
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

    //Scroll
    const rootRef = useRef(null);
    const refs = {
        bunRef: useRef(null),
        sauceRef: useRef(null),
        mainRef: useRef(null),
    };
    //const { bunRef, sauceRef, mainRef } = useRef(null, null, null);

    const handleScroll = () => {
        const currentPosition = rootRef.current.getBoundingClientRect().top;
        if (refs.bunRef.current && refs.sauceRef.current && refs.mainRef.current) {
            const minDistBun = Math.abs(currentPosition - refs.bunRef.current.getBoundingClientRect().top);
            const minDistSauce = Math.abs(currentPosition - refs.sauceRef.current.getBoundingClientRect().top);
            const minDistMain = Math.abs(currentPosition - refs.mainRef.current.getBoundingClientRect().top);
            setCurrent((minDistBun < minDistSauce) ? 'bun' : (minDistSauce < minDistMain) ? 'sauce' : 'main');
        }
    }

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
            {!isLoading ? (
                <>
                    <div className={`${styles.scrollable} mt-10`} onScroll={handleScroll} ref={rootRef}>
                        {
                            tabs.map(item => (
                                <section key={item.id} id={item.name}>
                                    <h1 className={`${styles.text} text text_type_main-medium`} ref={refs[item.name + "Ref"]}>{item.title}</h1>
                                    <ul className={`${styles.container} pl-4 pr-4 pb-10 pt-6`}>
                                        {
                                            data.filter(el => item.name === el.type).map(info => (
                                                <BurgerIngredientItem key={info._id} data={info} />
                                            ))
                                        }
                                    </ul>
                                </section>
                            ))
                        }
                    </div>
                </>
            ) : (
                <h1 className={`${styles.text} text text_type_main-large m-6`}>Загруска ингредиентов...</h1>
            )}
        </>
    );
}

export default BurgerIngredients;