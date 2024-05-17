import { orderReducer } from '../../../services/reducers/order-reducer';
import { initialState } from '../../../services/reducers/order-reducer';
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR } from '../../../services/constants';


describe('check orderReducer func', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })
    it('should handle CREATE_ORDER_REQUEST', () => {
        const action = { type: CREATE_ORDER_REQUEST };
        const expectedState = {
            ...initialState,
            isLoading: true,
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CREATE_ORDER_SUCCESS', () => {
        const action = { type: CREATE_ORDER_SUCCESS };
        const expectedState = {
            ...initialState,
            isLoading: false,
            order: undefined
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });
    it('should handle CREATE_ORDER_ERROR', () => {
        expect(orderReducer(initialState, CREATE_ORDER_ERROR)).toEqual({
            ...initialState,
            isLoading: false
        });
    })

})