import { createSelector } from 'reselect';
import { RootState } from './services/types';
import { TIngredient, TIngredientItem } from './services/types/data';

export const getData = (state: RootState) => state.ingredients;
export const isLoad = (state: RootState) => state.ingredients;
export const getOrderNumber = (state: RootState) => state.order.order?.order.number;
export const getIngredients = (state: RootState) => state.ingredients.addedIngredients;
export const getBun = (state: RootState) => state.ingredients.bun;
export const getBunId = (state: RootState) => state.ingredients.bun._id;

export const getCount = (item: TIngredientItem) => createSelector([getIngredients, getBunId], (ingredients, getBunId) => {
    if (item.type === 'bun') {
        if (item._id === getBunId) {
            return 2;
        } else {
            return 0;
        }
    } else {
        return ingredients.filter((ingredient: TIngredient) => ingredient._id === item._id).length
    }
});