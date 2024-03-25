import axios from 'axios';
import { BASE_URL } from "../../utils/apiConfig.js";
import { setCookie, getCookie, deleteCookie } from '../cookies';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const forgotPassword = (email, navigate) => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/password-reset`, {
                email: email,
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });

            const responseData = response.data;

            if (responseData.success) {
                dispatch({ type: RESET_PASSWORD });
                navigate('/reset-password')
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}

export const resetPassword = (userData, navigate) => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/password-reset`, {
                password: userData.password,
                token: userData.code,
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });

            const responseData = response.data;

            if (responseData.success) {
                navigate('/');
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}

export const login = (data) => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email: data.email,
                password: data.password,
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });

            const responseData = response.data;

            if (responseData.success) {
                dispatch({ type: CREATE_USER_SUCCESS, auth: true });
                setCookie('accessToken', responseData.accessToken, { expires: 20 * 60 });
                setCookie('refreshToken', responseData.refreshToken);
                return responseData;
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}

export const register = (data) => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, {
                email: data.email,
                password: data.password,
                name: data.name,
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });

            const responseData = response.data;

            if (responseData.success) {
                dispatch({ type: CREATE_USER_SUCCESS, auth: true });
                setCookie('accessToken', responseData.accessToken, { expires: 20 * 60 });
                setCookie('refreshToken', responseData.refreshToken);
                return responseData;
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}

export const logout = () => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/auth/logout`, {
                token: getCookie('refreshToken')
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });

            const responseData = response.data;

            if (responseData.success) {
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                dispatch({ type: CREATE_USER_SUCCESS, auth: false });
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };
    return fetchData();
}

export const getUser = (userData, setUserData) => (dispatch) => {
    if (!getCookie('accessToken')) {
        dispatch(getNewToken());
    }
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        const token = getCookie('accessToken');
        try {
            const responseData = await axios.get(`${BASE_URL}/auth/user`, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "authorization": token,
                },
            });
            const data = responseData.data;

            if (data.success) {
                setUserData({ ...userData, ...data.user });
                dispatch({ type: CREATE_USER_SUCCESS, auth: true });
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}

export const updateUser = (userData) => (dispatch) => {
    if (!getCookie('accessToken')) {
        dispatch(getNewToken());
    }
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        const token = getCookie('accessToken');
        try {
            const responseData = await axios.patch(`${BASE_URL}/auth/user`, {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "authorization": token,
                },
            });
            const data = responseData.data;

            if (data.success) {
                dispatch({ type: CREATE_USER_SUCCESS, auth: true });
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}

export const getNewToken = () => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axios.post(`${BASE_URL}/auth/token`, {
                token: getCookie('refreshToken'),
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });
            const responseData = response.data;
            if (responseData.success) {
                dispatch({ type: CREATE_USER_SUCCESS, auth: true });
                setCookie('accessToken', responseData.accessToken, { expires: 20 * 60 });
                setCookie('refreshToken', responseData.refreshToken);
                return responseData;
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_USER_ERROR });
        }
    };

    return fetchData();
}