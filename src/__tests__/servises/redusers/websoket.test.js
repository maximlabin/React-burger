import { wsReducer } from "../../../services/reducers/websocket-reducer";
import { initialState } from "../../../services/reducers/websocket-reducer";
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_GET_MESSAGE } from "../../../services/constants";

describe('check wsReducer func', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        const state = wsReducer(initialState, { type: WS_CONNECTION_ERROR });
        expect(state.wsConnected).toBe(false);
    });

    it('should handle WS_CONNECTION_START', () => {
        const state = wsReducer(initialState, { type: WS_CONNECTION_START });
        expect(state).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const state = wsReducer(initialState, { type: WS_CONNECTION_SUCCESS });
        expect(state.wsConnected).toBe(true);
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        const connectedState = { ...initialState, wsConnected: true };
        const state = wsReducer(connectedState, { type: WS_CONNECTION_CLOSED });
        expect(state.wsConnected).toBe(false);
    });

    it('should handle WS_GET_MESSAGE', () => {
        const fakeOrders = {
            orders: [
                {
                    createdAt: "2024-05-14T13:33:07.577Z",
                    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0942', '643d69a5c3f7b9001cfa093c'],
                    name: "Краторный spicy бургер",
                    number: 40011,
                    status: "done",
                    updatedAt: "2024-05-14T13:33:08.111Z",
                    _id: "6643681397ede0001d06abbc"
                },

            ],
            success: true,
            total: 1,
            totalToday: 0
        };
        const state = wsReducer(initialState, { type: WS_GET_MESSAGE, orders: fakeOrders });
        expect(state.orders).toEqual(fakeOrders);
    });
});