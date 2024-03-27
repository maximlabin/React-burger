import styles from './register.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { register } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store.user);
    const { values, handleChange } = useForm({ email: '', password: '', name: '' });

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    const onRegister = (e) => {
        e.preventDefault();
        dispatch(register(values));
        navigate('/');
    };

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className="text text_type_main-medium mb-8">Регистрация</h1>
                <form onSubmit={onRegister} className={styles.form}>
                    <Input
                        type="text"
                        placeholder="Имя"
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                    <Input
                        type="text"
                        placeholder="E-mail"
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                    <Input
                        type="password"
                        placeholder="Пароль"
                        onChange={handleChange}
                        value={values.password}
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