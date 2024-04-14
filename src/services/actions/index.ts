import uniqid from 'uniqid';
import { TIngredient } from '../types/data';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_CARD: 'MOVE_CARD' = 'MOVE_CARD';
export const CLEAR_ADDED_INGREDIENTS: 'CLEAR_ADDED_INGREDIENTS' = 'CLEAR_ADDED_INGREDIENTS';

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TIngredient;
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: string;
}

export interface IMoveCard {
    readonly type: typeof MOVE_CARD;
    readonly payload: {
        dragIndex: number;
        hoverIndex: number;
    }
}

export interface IClearSelectedIngredients {
    readonly type: typeof CLEAR_ADDED_INGREDIENTS;
}

export type TIngredientAction = IAddIngredient | IDeleteIngredient | IMoveCard | IClearSelectedIngredients;

export const addIngredient = (ingredient: TIngredient): IAddIngredient => ({
    type: ADD_INGREDIENT,
    payload: { ...ingredient, uniqId: uniqid() }
});

export const deleteIngredient = (_id: string): IDeleteIngredient => ({
    type: DELETE_INGREDIENT,
    payload: _id
});

export const moveCard = (dragIndex: number, hoverIndex: number) => ({
    type: MOVE_CARD,
    payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
    }
});

export const clearIngredients = (): IClearSelectedIngredients => ({
    type: CLEAR_ADDED_INGREDIENTS,
});