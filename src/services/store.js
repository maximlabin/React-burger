import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { ingredientReducer } from "./reducers/ingredient-reducer";
import { orderReducer } from './reducers/order-reducer';
import { modalReducer } from './reducers/modal-reducer';
import { userReducer } from './reducers/user-reducer';

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: orderReducer,
    modal: modalReducer,
    user: userReducer,
})

export const store = configureStore({
    reducer: rootReducer
}
);