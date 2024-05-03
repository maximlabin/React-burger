import { clearIngredients } from "./index";
import { axiosInstance } from "../axios";
import { TIngredient } from "../types/data.js";

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
} from "../constants";
import { AppDispatch } from "../types";
import { getCookie } from "../cookies";
import { getNewToken } from "./user";

export interface ICreateOrderRequest {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccess {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly payload: TIngredient;
}

export interface ICreateOrderError {
    readonly type: typeof CREATE_ORDER_ERROR;
    readonly payload: string;
}

export type TOrder = ICreateOrderError | ICreateOrderRequest | ICreateOrderSuccess;
export const addOrder = (data: Array<TIngredient>) => (dispatch: AppDispatch) => {
    if (!getCookie('accessToken')) {
        dispatch(getNewToken());
    }
    const fetchData = async () => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const token = getCookie('accessToken');
        try {
            const response = await axiosInstance.post(`/orders`, {
                ingredients: data,
            }, {
                headers: {
                    "authorization": token,
                },
            });

            const responseData = response.data;

            if (responseData.success) {
                dispatch({ type: CREATE_ORDER_SUCCESS, payload: responseData });
                dispatch(clearIngredients())
                return responseData;
            } else {
                throw new Error('Order creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_ORDER_ERROR, payload: (error as Error).message });
        }
    };

    return fetchData();
};