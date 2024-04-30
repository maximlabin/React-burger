import { AppDispatch } from "../types";
import { axiosInstance } from "../axios";
import { WS_USER_URL } from "../../utils/apiConfig";
import { GET_FOUND_ORDER_ERROR, GET_FOUND_ORDER_REQUEST, GET_FOUND_ORDER_SUCCESS } from "../constants";
import { IOrdersResponse } from "../types/data";



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
            const { data: response } = await axiosInstance.get(`${WS_USER_URL}${order}`);
            dispatch({ type: GET_FOUND_ORDER_SUCCESS, payload: response.data })
        } catch (error) {
            dispatch({ type: GET_FOUND_ORDER_ERROR, payload: error })
        }
    }
    fetchData();
}