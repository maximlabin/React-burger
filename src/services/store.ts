import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { ingredientReducer } from "./reducers/ingredient-reducer";
import { orderReducer } from './reducers/order-reducer';
import { modalReducer } from './reducers/modal-reducer';
import { userReducer } from './reducers/user-reducer';
import { wsReducer } from './reducers/websocket-reducer';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './constants';
import { wsMiddleware } from './wsMiddleware';
import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_START, WS_USER_GET_MESSAGE, WS_USER_CONNECTION_SUCCESS } from './constants';
import { WS_URL, WS_USER_URL } from '../utils/apiConfig';
import { wsUserReducer } from './reducers/websocket-user-reducer';
import { foundOrderReducer } from './reducers/foundOrder-reducer';

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer,
    ws: wsReducer,
    wsUser: wsUserReducer,
    foundOrder: foundOrderReducer
})

const wsActions = {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE
};

const wsActionsUser = {
    WS_CONNECTION_START: WS_USER_CONNECTION_START,
    WS_CONNECTION_SUCCESS: WS_USER_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED: WS_USER_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR: WS_USER_CONNECTION_ERROR,
    WS_GET_MESSAGE: WS_USER_GET_MESSAGE
};

const soket = wsMiddleware(WS_URL, wsActions, { checkToken: false });
const soketUser = wsMiddleware(WS_USER_URL, wsActionsUser, { checkToken: true });

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(soket, soketUser)
});