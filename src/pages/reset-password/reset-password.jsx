import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function ResetPassword() {
    const [userData, setUserData] = useState(
        {
            password: '',
            code: '',
        }
    )
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, resetPassword } = useSelector(store => store.user);
    console.log(resetPassword);
    const changeForm = (e, field) => {
        if (field === 'code') {
            setUserData({ ...userData, code: e.target.value });
        } else if (field === 'password') {
            setUserData({ ...userData, password: e.target.value });
        }
    }

    const onResetPassword = (e) => {
        e.preventDefault();
        dispatch(resetPassword(userData, navigate));
    }

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
        if (!resetPassword) {
            navigate("/forgot-password");
        }
    }, [auth, navigate, resetPassword]);

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className='text text_type_main-medium mb-8'>Восстановление пароля</h1>
                <form onSubmit={e => onResetPassword(e)} className={styles.form}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => changeForm(e, 'password')}
                        value={userData.password}
                        name={'e-mail'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => changeForm(e, 'code')}
                        value={userData.code}
                        name={'e-mail'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Button type='primary' size='medium' htmlType='submit'>
                        Сохранить
                    </Button>
                </form>
                <div className={`${styles.login} mt-15`}>
                    <h2 className='text text_type_main-default text_color_inactive'>
                        Вспомнили пароль?
                    </h2>
                    <Link className={`${styles.link} ml-2`} to='/login'>Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;