import { initialState } from '../../../services/reducers/modal-reducer';
import { modalReducer } from '../../../services/reducers/modal-reducer';
import { SET_SELECTED_INGREDIENT, CLEAR_SELECTED_INGREDIENT } from '../../../services/constants';

describe('modalReducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            selectedIngredient: null,
        };
        expect(modalReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SET_SELECTED_INGREDIENT action', () => {
        const action = {
            type: SET_SELECTED_INGREDIENT,
            payload: 'some ingredient',
        };
        const newState = modalReducer(initialState, action);
        expect(newState.selectedIngredient).toEqual(action.payload);
    });

    it('should handle CLEAR_SELECTED_INGREDIENT action', () => {
        const currentState = {
            selectedIngredient: 'some ingredient',
        };
        const newState = modalReducer(currentState, { type: CLEAR_SELECTED_INGREDIENT });
        expect(newState.selectedIngredient).toBeNull();
    });
});
