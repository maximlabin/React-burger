import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { register } from '../../services/actions/user';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store.user);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const changeForm = (e, field) => {
        if (field === 'email') {
            setUserData({ ...userData, email: e.target.value });
        } else if (field === 'password') {
            setUserData({ ...userData, password: e.target.value });
        } else if (field === 'name') {
            setUserData({ ...userData, name: e.target.value });
        }
    };

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    });

    const onRegister = (e) => {
        e.preventDefault();
        dispatch(register(userData));
        navigate('/');
    };

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className="text text_type_main-medium mb-8">Регистрация</h1>
                <form onSubmit={e => onRegister(e)} className={styles.form}>
                    <Input
                        type="text"
                        placeholder="Имя"
                        onChange={e => changeForm(e, 'name')}
                        value={userData.name}
                        name="name"
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                    <Input
                        type="text"
                        placeholder="E-mail"
                        onChange={e => changeForm(e, 'email')}
                        value={userData.email}
                        name="e-mail"
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                    <Input
                        type="password"
                        placeholder="Пароль"
                        onChange={e => changeForm(e, 'password')}
                        value={userData.password}
                        icon='HideIcon'
                        name="password"
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                    <Button type="primary" size="medium" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={`${styles.login} mt-15`}>
                    <h2 className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                    </h2>
                    <Link className={`${styles.link} ml-2`} to="/login">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;