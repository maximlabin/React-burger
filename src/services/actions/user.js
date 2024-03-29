import { BASE_URL } from "../../utils/apiConfig.js";
import { setCookie, getCookie, deleteCookie } from '../cookies';
import { axiosInstance } from "../axios.js";

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const forgotPassword = (email, navigate) => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_USER_REQUEST });
        try {
            const response = await axiosInstance.post("/password-reset", {
                email: email,
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
            const response = await axiosInstance.post("/password-reset", {
                password: userData.password,
                token: userData.code,
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
            const response = await axiosInstance.post("/auth/login", {
                email: data.email,
                password: data.password,
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
            const response = await axiosInstance.post("/auth/register", {
                email: data.email,
                password: data.password,
                name: data.name,
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
            const response = await axiosInstance.post("/auth/logout", {
                token: getCookie('refreshToken')
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
            const responseData = await axiosInstance.get("/auth/user", {
                headers: {
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
            const responseData = await axiosInstance.patch(`${BASE_URL}/auth/user`, {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            }, {
                headers: {
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
            const response = await axiosInstance.post("/auth/token", {
                token: getCookie('refreshToken'),
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