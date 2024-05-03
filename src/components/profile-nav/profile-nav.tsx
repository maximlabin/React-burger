import styles from './profile-nav.module.css';
import { NavLink, useMatch } from 'react-router-dom';
import { logout } from '../../services/actions/user';
import { useAppDispatch } from '../../hooks/useDispatch';

function ProfileNav() {
    const dispatch = useAppDispatch();
    const matchOrders = useMatch("/profile/orders");
    const matchProfile = useMatch("/profile");

    const onLogout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className={`${styles.menu} text_type_main-medium`}>
            <NavLink to={'/profile'} className={matchProfile ? styles.active_link : styles.link} end>
                Профиль
            </NavLink>
            <NavLink to={'/profile/orders'} className={matchOrders ? styles.active_link : styles.link} end>
                История заказов
            </NavLink>
            <button className={`${styles.link} text_type_main-medium`} onClick={e => onLogout(e)}>
                Выход
            </button>
            <p className='text text_type_main-default text_color_inactive mt-20'>
                В этом разделе вы можете
                изменить свои персональные данные
            </p>
        </div>
    );
}

export default ProfileNav;