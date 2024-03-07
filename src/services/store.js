import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { ingredientReducer } from "./reducers/ingredient-reducer";
import { orderReducer } from './reducers/order-reducer';
import { modalReducer } from './reducers/modal-reducer';

const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: orderReducer,
    modal: modalReducer
})

export const store = configureStore({
    reducer: rootReducer
}
);