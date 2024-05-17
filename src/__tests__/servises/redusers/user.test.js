import { userReducer } from '../../../services/reducers/user-reducer';
import { initialState } from '../../../services/reducers/user-reducer';
import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR, RESET_PASSWORD } from '../../../services/constants';

describe('check userReducer func', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CREATE_USER_REQUEST', () => {
        expect(userReducer(initialState, { type: CREATE_USER_REQUEST })).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('should handle CREATE_USER_SUCCESS', () => {
        const fakeUserPayload = {
            name: 'some name',
            email: 'some email',
        };
        expect(userReducer(initialState, { type: CREATE_USER_SUCCESS, payload: fakeUserPayload })).toEqual({
            ...initialState,
            isLoading: false,
            auth: undefined,
        });
    });

    it('should handle CREATE_USER_ERROR', () => {
        expect(userReducer(initialState, { type: CREATE_USER_ERROR })).toEqual({
            ...initialState,
            isLoading: false,
            error: true,
        });
    });

    it('should handle RESET_PASSWORD', () => {
        expect(userReducer(initialState, { type: RESET_PASSWORD })).toEqual({
            ...initialState,
            resetPassword: true,
        });
    });
});
