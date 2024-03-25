import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR, RESET_PASSWORD } from "../actions/user";
import { getCookie } from '../cookies';

const initialState = {
    auth: !!getCookie('accessToken'),
    resetPassword: false,
    isLoading: false,
    error: false,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                auth: action.auth,
            };
        case CREATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        case RESET_PASSWORD:
            return {
                ...state,
                resetPassword: true,
            };
        default:
            return state;
    }
}