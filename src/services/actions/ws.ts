import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_GET_MESSAGE } from "../constants";

import { TOrder } from "../types/data";

export interface ICreateConactionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface ICreateConactionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface ICreateConactionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface ICreateConactionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface ICreateConactionMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly orders: TOrder[];
}

export type TWSActions = ICreateConactionError | ICreateConactionSuccess | ICreateConactionStart | ICreateConactionClosed | ICreateConactionMessage;

