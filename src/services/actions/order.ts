import { clearIngredients } from "./index";
import { axiosInstance } from "../axios";
import { Dispatch } from "redux";
import { TIngredient } from "../types/data.js";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';

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
export const addOrder = (data: TIngredient) => (dispatch: Dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const response = await axiosInstance.post(`/orders`, {
                ingredients: data,
            });

            const responseData = response.data;

            if (responseData.success) {
                dispatch({ type: CREATE_ORDER_SUCCESS, payload: responseData });
                //@ts-ignore
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