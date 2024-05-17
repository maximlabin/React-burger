import { wsUserReducer } from "../../../services/reducers/websocket-user-reducer";
import { initialState } from "../../../services/reducers/websocket-user-reducer";
import { WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_START, WS_USER_GET_MESSAGE } from "../../../services/constants";

describe('check wsUserReducer func', () => {
    it('should return the initial state', () => {
        expect(wsUserReducer(undefined, {})).toEqual(initialState)
    })
    it('should handle WS_USER_CONNECTION_SUCCESS', () => {
        const action = { type: WS_USER_CONNECTION_SUCCESS };
        const expectedState = {
            ...initialState,
            wsConnected: true
        };
        expect(wsUserReducer(initialState, action)).toEqual(expectedState);
    })
    it('should handle WS_USER_CONNECTION_CLOSED', () => {
        const action = { type: WS_USER_CONNECTION_CLOSED };
        const expectedState = {
            ...initialState,
            wsConnected: false
        };
        expect(wsUserReducer(initialState, action)).toEqual(expectedState);
    })
    it('should handle WS_USER_CONNECTION_ERROR', () => {
        const action = { type: WS_USER_CONNECTION_ERROR };
        const expectedState = {
            ...initialState,
            wsConnected: false
        };
        expect(wsUserReducer(initialState, action)).toEqual(expectedState);
    })
    it('should handle WS_USER_CONNECTION_START', () => {
        const action = { type: WS_USER_CONNECTION_START };
        const expectedState = {
            ...initialState
        };
        expect(wsUserReducer(initialState, action)).toEqual(expectedState);
    })
    it('should handle WS_USER_GET_MESSAGE', () => {
        const action = { type: WS_USER_GET_MESSAGE, orders: [] };
        const expectedState = {
            ...initialState,
            orders: action.orders
        };
        expect(wsUserReducer(initialState, action)).toEqual(expectedState);
    })


})