import { TWSActions } from "../actions/ws";
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_GET_MESSAGE } from "../constants";

import { IOrdersResponse } from "../types/data";

type TWSState = {
    wsConnected: boolean;
    orders: IOrdersResponse;
}

export const initialState: TWSState = {
    wsConnected: false,
    orders: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0
    }
}

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };
        case WS_CONNECTION_START:
            return {
                ...state
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.orders
            };
        default:
            return state;
    }
}
