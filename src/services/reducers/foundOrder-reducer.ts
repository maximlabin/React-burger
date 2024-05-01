import { TFoundOrderResponse } from "../actions/foundorder"
import { IFoundOrderResponse } from "../types/data"
import { GET_FOUND_ORDER_ERROR, GET_FOUND_ORDER_REQUEST, GET_FOUND_ORDER_SUCCESS } from "../constants";

interface IFoundOrderState {
    foundOrder: IFoundOrderResponse,
    isLoading: boolean
    error: null | string
}

const initialState: IFoundOrderState = {
    isLoading: false,
    error: null,
    foundOrder: {
        orders: [],
        success: false,
    }
}

export const foundOrderReducer = (state = initialState, action: TFoundOrderResponse) => {
    switch (action.type) {
        case GET_FOUND_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
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
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}