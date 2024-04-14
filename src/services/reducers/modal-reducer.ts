import { SET_SELECTED_INGREDIENT, CLEAR_SELECTED_INGREDIENT } from '../actions/modal';
import { TIngredientItem } from '../types/data';
import { TModalAction } from '../actions/modal';

interface IModalState {
    selectedIngredient: TIngredientItem | null;
}

const initialState: IModalState = {
    selectedIngredient: null,
};

export const modalReducer = (state = initialState, action: TModalAction) => {
    switch (action.type) {
        case SET_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: action.payload,
            };
        case CLEAR_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: null,
            };
        default:
            return state;
    }
};