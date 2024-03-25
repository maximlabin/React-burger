import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/actions/user';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store.user);
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    });

    const changeForm = (e, field) => {
        if (field === 'email') {
            setUserData({ ...userData, email: e.target.value });
        } else if (field === 'password') {
            setUserData({ ...userData, password: e.target.value });
        }
    }
    const onLogin = e => {
        e.preventDefault();
        dispatch(login(userData));
    }

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className='text text_type_main-medium mb-8'>Вход</h1>
                <form onSubmit={(e) => onLogin(e)} className={styles.form}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={e => changeForm(e, 'email')}
                        value={userData.email}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => changeForm(e, 'password')}
                        value={userData.password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Button type='primary' size='medium' htmlType='submit'>
                        Войти
                    </Button>
                </form>
                <div className={`${styles.register} mt-15`}>
                    <h2 className='text text_type_main-default text_color_inactive'>
                        Вы — новый пользователь?
                    </h2>
                    <Link className={`${styles.link} ml-2`} to='/register'>Зарегистрироваться
                    </Link>
                </div>
                <div className={`${styles.forgot_password} mt-4`}>
                    <h2 className='text text_type_main-default text_color_inactive'>
                        Забыли пароль?
                    </h2>
                    <Link className={`${styles.link} ml-2`} to='/forgot-password'>Восстановить пароль
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;