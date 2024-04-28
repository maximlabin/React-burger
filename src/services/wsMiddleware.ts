import { Middleware } from "redux";
import { RootState } from "../services/types";

export type WsActions = {
    WS_CONNECTION_START: string,
    WS_CONNECTION_SUCCESS: string,
    WS_CONNECTION_CLOSED: string,
    WS_CONNECTION_ERROR: string,
    WS_GET_MESSAGE: string
};

export const wsMiddleware = (wsUrl: string, wsActions: WsActions, { checkToken }: { checkToken?: boolean }): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url: string | null = null;
        let closing: boolean = false;
        const {
            WS_CONNECTION_START,
            WS_CONNECTION_SUCCESS,
            WS_CONNECTION_CLOSED,
            WS_CONNECTION_ERROR,
            WS_GET_MESSAGE
        } = wsActions;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket("wss://norma.nomoreparties.space/orders/all");
                socket.onopen = (event) => {
                    dispatch({ type: WS_CONNECTION_SUCCESS });
                };

                socket.onerror = (event) => {
                    dispatch({ type: WS_CONNECTION_ERROR });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    console.log(parsedData)
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
                //socket.send(JSON.stringify(order));
            }

            next(action);
        };
    };
};

