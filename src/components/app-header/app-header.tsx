import React from "react";
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <ul className={`${styles.nav}`}>
                <li>
                    <BurgerIcon type="primary" />
                    <span>Конструктор</span>
                </li>
                <li>
                    <ListIcon type="secondary" />
                    <span>Лента заказов</span>
                </li>
                <li>
                    <Logo />
                </li>
                <li>
                    <ProfileIcon type="secondary" />
                    <span>Личный кабинет</span>
                </li>
            </ul>
        </header>
    );
}

export default AppHeader;