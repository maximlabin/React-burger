import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/user';

function ForgotPassword() {
    const { auth } = useSelector(store => store.user);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendEmail = e => {
        e.preventDefault();
        dispatch(forgotPassword(email, navigate));
    }

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, [auth, navigate]);

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className='text text_type_main-medium mb-8'>Восстановление пароля</h1>
                <form onSubmit={(e) => sendEmail(e)} className={styles.form}>
                    <Input
                        type={'text'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'e-mail'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Button type='primary' size='medium' htmlType='submit'>
                        Восстановить
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

export default ForgotPassword;