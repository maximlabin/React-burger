import uniqid from 'uniqid';
import { TIngredient } from '../types/data';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_CARD = 'MOVE_CARD';
export const CLEAR_ADDED_INGREDIENTS = 'CLEAR_ADDED_INGREDIENTS';

export const addIngredient = (ingredient: TIngredient) => ({
    type: ADD_INGREDIENT,
    payload: { ...ingredient, uniqId: uniqid() }
})

export const deleteIngredient = (_id: string) => ({
    type: DELETE_INGREDIENT,
    payload: _id
})

export const moveCard = (dragIndex: number, hoverIndex: number) => ({
    type: MOVE_CARD,
    payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
    }
})

export const clearIngredients = () => ({
    type: CLEAR_ADDED_INGREDIENTS,
});