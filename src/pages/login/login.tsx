import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useSelector } from '../../hooks/useSelector';
import { useAppDispatch } from '../../hooks/useDispatch';
import { login } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store.user);
    const { values, handleChange } = useForm({ email: '', password: '' });

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(values));
    }

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className='text text_type_main-medium mb-8'>Вход</h1>
                <form onSubmit={onLogin} className={styles.form}>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={handleChange}
                        value={values.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={handleChange}
                        value={values.password}
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