import { GET_INGREDIENT_REQUEST, GET_INGREDIENT_SUCCESS, GET_INGREDIENT_ERROR, ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_CARD, CLEAR_ADDED_INGREDIENTS } from '../constants';
import { TIngredientAction } from '../actions/index';
import { TIngredientResponse } from '../actions/getIngredients';
import { TIngredient, TIngredientItem } from '../types/data';

type TAction = TIngredientResponse | TIngredientAction;
interface IBun {
    name: string;
    type: string;
    image: string;
    price: number;
}

interface IIngredientState {
    data: TIngredientItem[];
    bun: IBun;
    addedIngredients: TIngredient[];
    isLoading: boolean;
    error: string | undefined;
}

const initialState: IIngredientState = {
    data: [],
    bun: {
        name: 'Выберите булку',
        type: 'bun',
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        price: 0
    },
    addedIngredients: [],
    isLoading: true,
    error: 'undefined'
};
export const ingredientReducer = (state = initialState, action: TAction) => {
    switch (action.type) {
        case GET_INGREDIENT_REQUEST:
            return { ...state, isLoading: true }
        case GET_INGREDIENT_SUCCESS:
            return { ...state, isLoading: false, data: action.payload }
        case GET_INGREDIENT_ERROR:
            return { ...state, isLoading: false, error: action.payload }
        case ADD_INGREDIENT:
            if (action.payload.type === 'bun') {
                return { ...state, bun: action.payload };
            } else {
                return { ...state, addedIngredients: [...state.addedIngredients, action.payload] };
            }
        case DELETE_INGREDIENT:
            const filterIngredients = state.addedIngredients.filter(ingredient => ingredient.uniqId !== action.payload);
            return { ...state, addedIngredients: filterIngredients }
        case MOVE_CARD:
            const ingredients = [...state.addedIngredients];
            ingredients.splice(action.payload.hoverIndex, 0, ingredients.splice(action.payload.dragIndex, 1)[0]);

            return {
                ...state,
                addedIngredients: ingredients
            }
        case CLEAR_ADDED_INGREDIENTS:
            return {
                ...state,
                addedIngredients: [],
                bun: {
                    name: 'Добавить булку',
                    type: 'bun',
                    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                    price: 0
                }
            }
        default:
            return state;
    }
}