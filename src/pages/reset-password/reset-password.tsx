import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useEffect, FormEvent } from 'react';
import { resetPassword } from '../../services/actions/user';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch } from '../../hooks/useDispatch';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { auth } = useSelector((store) => store.user);
    const check = useSelector((store) => store.user.resetPassword);
    const { values, handleChange } = useForm({ password: '', code: '' });

    const onResetPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword({ password: values.password, code: values.code }, navigate));
    }

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
        if (!check) {
            navigate("/forgot-password");
        }
    }, [auth, navigate, check]);

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <h1 className='text text_type_main-medium mb-8'>Восстановление пароля</h1>
                <form onSubmit={onResetPassword} className={styles.form}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.code}
                        name={'code'}
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