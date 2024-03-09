import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR } from '../actions/order';

const initialState = {
    order: null,
    isLoading: false,
    error: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            };
        case CREATE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                order: null,
                error: action.payload
            };
        default:
            return state;
    }
};