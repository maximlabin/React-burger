import styles from './profile-form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { getUser, updateUser } from '../../services/actions/user';
import { useDispatch } from 'react-redux';

function ProfileForm() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(
        {
            name: '',
            email: '',
            password: '',
        }
    )
    useEffect(() => {
        dispatch(getUser(userData, setUserData));
    }, []);

    const onChangeFormData = (e, field) => {
        if (field === 'name') {
            setUserData({ ...userData, name: e.target.value });
        } else if (field === 'email') {
            setUserData({ ...userData, email: e.target.value });
        } else if (field === 'password') {
            setUserData({ ...userData, password: e.target.value });
        }
    }
    const onSave = (e) => {
        e.preventDefault();
        dispatch(updateUser(userData, setUserData));
    }
    const onCancel = (e) => {
        e.preventDefault();
        dispatch(getUser(userData, setUserData));
    }

    return (
        <form className={`${styles.form} ml-15`} onSubmit={(e) => onSave(e)}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e) => onChangeFormData(e, 'name')}
                icon='EditIcon'
                value={userData.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={(e) => onChangeFormData(e, 'email')}
                icon='EditIcon'
                value={userData.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={(e) => onChangeFormData(e, 'password')}
                icon='EditIcon'
                value={userData.password}
                name={'pasword'}
                error={false}
                errorText={'Ошибка'}
            />
            <div className={styles.menu}>
                <Button
                    type={"primary"}
                    size={"medium"}
                    htmlType={'submit'}>
                    Сохранить
                </Button>
                <Button
                    type={"secondary"}
                    size={"medium"}
                    htmlType={'submit'}
                    onClick={(e) => onCancel(e)}
                >
                    Отмена
                </Button>
            </div>
        </form>
    );
}

export default ProfileForm;