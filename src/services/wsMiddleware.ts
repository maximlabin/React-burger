import { Middleware } from "redux";
import { getCookie } from "./cookies";
import { IOrdersResponse } from "./types/data";

export type WsActions = {
    WS_CONNECTION_START: string,
    WS_CONNECTION_SUCCESS: string,
    WS_CONNECTION_CLOSED: string,
    WS_CONNECTION_ERROR: string,
    WS_GET_MESSAGE: string
};

export const wsMiddleware = (wsUrl: string, actions: WsActions, { checkToken }: { checkToken?: boolean }): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        let closing: boolean = false;
        const {
            WS_CONNECTION_START,
            WS_CONNECTION_SUCCESS,
            WS_CONNECTION_CLOSED,
            WS_CONNECTION_ERROR,
            WS_GET_MESSAGE
        } = actions;

        return (next) => (action) => {
            const { dispatch } = store;
            type ActionType = {
                type: string,
            };
            type ActionOrders = {
                orders: IOrdersResponse[],
            }
            const { type } = action as ActionType;
            const { orders } = action as ActionOrders;
            const token = getCookie('accessToken');

            if (type === WS_CONNECTION_START) {
                if (checkToken && token) {
                    socket = new WebSocket(`${wsUrl}?token=${token.slice(7)}`);
                } else {
                    socket = new WebSocket(wsUrl);
                }
                socket.onopen = (event) => {
                    dispatch({ type: WS_CONNECTION_SUCCESS });
                };

                socket.onerror = (event) => {
                    dispatch({ type: WS_CONNECTION_ERROR });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({
                        type: WS_GET_MESSAGE,
                        orders: parsedData
                    });
                };

                socket.onclose = (event) => {
                    if (closing) {
                        dispatch({ type: WS_CONNECTION_CLOSED });
                    } else {
                        dispatch({ type: WS_CONNECTION_START });
                    }
                };
            }

            if (WS_CONNECTION_CLOSED && type === WS_CONNECTION_CLOSED && socket) {
                closing = true;
                socket.close();
            }

            if (WS_GET_MESSAGE && type === WS_GET_MESSAGE && socket) {
                if (type === WS_GET_MESSAGE && socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(orders));
                }
            }

            next(action);
        };
    };
};

