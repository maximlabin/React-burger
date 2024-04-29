import { TIngredientItem } from "../types/data";

import {
    SET_SELECTED_INGREDIENT,
    CLEAR_SELECTED_INGREDIENT
} from "../constants";

export interface ISetSelectedIngredient {
    readonly type: typeof SET_SELECTED_INGREDIENT;
    readonly payload: TIngredientItem;
}

export interface IClearSelectedIngredient {
    readonly type: typeof CLEAR_SELECTED_INGREDIENT;
}

export type TModalAction = ISetSelectedIngredient | IClearSelectedIngredient;

export const setSelectedIngredient = (ingredient: TIngredientItem): ISetSelectedIngredient => ({
    type: SET_SELECTED_INGREDIENT,
    payload: ingredient,
});

export const clearSelectedIngredient = (): IClearSelectedIngredient => ({
    type: CLEAR_SELECTED_INGREDIENT,
});