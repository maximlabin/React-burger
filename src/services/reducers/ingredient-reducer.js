import { GET_INGREDIENT_REQUEST, GET_INGREDIENT_SUCCESS, GET_INGREDIENT_ERROR } from '../actions/getIngredients';
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_CARD } from '../actions/index';

const initialState = {
    data: [],
    addedIngredients: [{
        name: 'Добавить булку',
        type: 'bun',
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        price: 0
    }],
    isLoading: true,
    error: 'undefined'
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENT_REQUEST:
            return { ...state, isLoading: true }
        case GET_INGREDIENT_SUCCESS:
            return { ...state, isLoading: false, data: action.payload }
        case GET_INGREDIENT_ERROR:
            return { ...state, isLoading: false, error: action.payload }
        case ADD_INGREDIENT:
            let updatedIngredients = state.addedIngredients.slice();

            if (action.payload.type === 'bun') {
                const bunIndex = updatedIngredients.findIndex(item => item.type === 'bun');
                if (bunIndex !== -1) {
                    updatedIngredients[bunIndex] = action.payload;
                } else {
                    updatedIngredients.unshift(action.payload);
                }
            } else {
                updatedIngredients.push(action.payload);
            }

            return { ...state, addedIngredients: updatedIngredients };
        case DELETE_INGREDIENT:
            const filterIngredients = state.addedIngredients.filter(ingredient => ingredient.uniqId !== action.payload);
            return { ...state, addedIngredients: filterIngredients }
        case MOVE_CARD:
            const ingredients = [...state.addedIngredients];
            ingredients.splice(action.payload.hoverIndex + 1, 0, ingredients.splice(action.payload.dragIndex + 1, 1)[0]);

            return {
                ...state,
                addedIngredients: ingredients
            }
        default:
            return state;
    }
}