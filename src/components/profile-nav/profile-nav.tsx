import styles from './profile-nav.module.css';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/user';
import { useDispatch } from 'react-redux';

function ProfileNav() {
    const dispatch = useDispatch();

    const onLogout = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(logout());
    };

    return (
        <div className={styles.menu}>
            <NavLink to={'/profile'} className={`${styles.link} text_type_main-medium`}>
                Профиль
            </NavLink>
            <NavLink to={'/order'} className={`${styles.link} text_type_main-medium`}>
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