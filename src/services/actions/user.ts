import { BASE_URL } from "../../utils/apiConfig";
import { setCookie, getCookie, deleteCookie } from '../cookies';
import { axiosInstance } from "../axios";
import { Dispatch } from "redux";
import { IUser, IUserFormData } from '../types/data';
import { NavigateFunction } from 'react-router-dom';

export const CREATE_USER_REQUEST: 'CREATE_USER_REQUEST' = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS' = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR: 'CREATE_USER_ERROR' = 'CREATE_USER_ERROR';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';

export interface ICreateUserRequest {
    readonly type: typeof CREATE_USER_REQUEST;
}

export interface ICreateUserSuccess {
    readonly type: typeof CREATE_USER_SUCCESS;
    readonly auth: boolean;
}

export interface ICreateUserError {
    readonly type: typeof CREATE_USER_ERROR;
    readonly payload: string;
}

export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}

export type TUser = ICreateUserError | IResetPassword | ICreateUserRequest | ICreateUserSuccess;

export const forgotPassword = (email: string, navigate: NavigateFunction) => (dispatch: Dispatch) => {
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

export const resetPassword = (userData: { password: string, code: string }, navigate: NavigateFunction) => (dispatch: Dispatch) => {
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

export const login = (data: { email: string, password: string }) => (dispatch: Dispatch) => {
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

export const register = (data: IUserFormData) => (dispatch: Dispatch) => {
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

export const logout = () => (dispatch: Dispatch) => {
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

export const getUser = (userData: IUser, setUserData: any) => (dispatch: Dispatch) => {
    if (!getCookie('accessToken')) {
        // @ts-ignore
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

export const updateUser = (userData: IUser) => (dispatch: Dispatch) => {
    if (!getCookie('accessToken')) {
        // @ts-ignore
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

export const getNewToken = () => (dispatch: Dispatch) => {
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