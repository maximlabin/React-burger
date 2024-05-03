import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR, RESET_PASSWORD } from "../constants";
import { getCookie } from '../cookies';
import { TUser } from '../actions/user';
interface IAuthState {
    auth: boolean;
    resetPassword: boolean;
    isLoading: boolean;
    error: boolean;
}

const initialState: IAuthState = {
    auth: !!getCookie('accessToken'),
    resetPassword: false,
    isLoading: false,
    error: false,
};
export const userReducer = (state = initialState, action: TUser) => {
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