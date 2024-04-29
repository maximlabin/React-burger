import { TWSActions } from "../actions/ws-user";
import { WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_START, WS_USER_GET_MESSAGE } from "../constants";

import { IOrdersResponse } from "../types/data";

type TWSUserState = {
    wsConnected: boolean;
    orders: IOrdersResponse;
}

const initialState: TWSUserState = {
    wsConnected: false,
    orders: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0
    }
}

export const wsUserReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_USER_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_USER_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
        case WS_USER_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };
        case WS_USER_CONNECTION_START:
            return {
                ...state
            };
        case WS_USER_GET_MESSAGE:
            return {
                ...state,
                orders: action.orders
            };
        default:
            return state;
    }
}