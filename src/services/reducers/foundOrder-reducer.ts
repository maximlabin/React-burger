import { TFoundOrderResponse } from "../actions/foundorder"
import { IOrdersResponse } from "../types/data"
import { GET_FOUND_ORDER_ERROR, GET_FOUND_ORDER_REQUEST, GET_FOUND_ORDER_SUCCESS } from "../constants";

interface IFoundOrderState {
    foundOrder: IOrdersResponse,
    isLoading: boolean
}

const initialState: IFoundOrderState = {
    isLoading: false,
    foundOrder: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0
    }
}

export const foundOrderReducer = (state = initialState, action: TFoundOrderResponse) => {
    switch (action.type) {
        case GET_FOUND_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GET_FOUND_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                foundOrder: action.payload
            };
        case GET_FOUND_ORDER_ERROR:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}