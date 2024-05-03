
import React from "react";
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, useMatch } from 'react-router-dom';

function AppHeader() {
    const matchHome = useMatch("/");
    const matchOrders = useMatch("/feed");
    const matchProfile = useMatch("/profile");

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav>
                <NavLink to="/"
                    className={`${matchHome ? styles.activeButton : styles.button}`}
                    end>
                    <BurgerIcon type={matchHome ? "primary" : "secondary"} />
                    <span className="text text_type_main-default">Конструктор</span>
                </NavLink>
                <NavLink to="/feed"
                    className={`${matchOrders ? styles.activeButton : styles.button}`}
                    end>
                    <ListIcon type={matchOrders ? "primary" : "secondary"} />
                    <span className="text text_type_main-default">Лента заказов</span>
                </NavLink>
                <NavLink to="/"
                    className={`${matchHome ? styles.activeButton : styles.button}`}
                    end>
                    <Logo />
                </NavLink>
                <NavLink to="/profile"
                    className={`${matchProfile ? styles.activeButton : styles.button}`}
                    end>
                    <ProfileIcon type={matchProfile ? "primary" : "secondary"} />
                    <span className="text text_type_main-default">Личный кабинет</span>
                </NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;