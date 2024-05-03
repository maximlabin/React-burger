import { AppDispatch } from "../types";
import { axiosInstance } from "../axios";
import { BASE_URL } from "../../utils/apiConfig";
import { GET_FOUND_ORDER_ERROR, GET_FOUND_ORDER_REQUEST, GET_FOUND_ORDER_SUCCESS } from "../constants";
import { IOrdersResponse } from "../types/data";
import { getCookie } from "../cookies";


export interface IGetFoundOrderRequest {
    readonly type: typeof GET_FOUND_ORDER_REQUEST;
}

export interface IGetFoundOrderSuccess {
    readonly type: typeof GET_FOUND_ORDER_SUCCESS;
    readonly payload: IOrdersResponse;
}

export interface IGetFoundOrderError {
    readonly type: typeof GET_FOUND_ORDER_ERROR;
    readonly payload: unknown;
}

export type TFoundOrderResponse = IGetFoundOrderError | IGetFoundOrderRequest | IGetFoundOrderSuccess;

export const getFoundOrder = (order: string) => (dispatch: AppDispatch) => {
    const fetchData = async () => {
        dispatch({ type: GET_FOUND_ORDER_REQUEST });
        try {
            const { data: response } = await axiosInstance.get(`${BASE_URL}/orders/${order}`, {
                headers: {
                    token: getCookie('refreshToken'),
                }
            });
            dispatch({ type: GET_FOUND_ORDER_SUCCESS, payload: response });
        } catch (error: any) {
            dispatch({ type: GET_FOUND_ORDER_ERROR, payload: error.message });
        }
    };
    fetchData();
};