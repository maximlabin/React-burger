import { createSelector } from 'reselect';

export const getData = state => state.ingredients;
export const isLoad = state => state.ingredients;
export const getOrderNumber = state => state.order.order?.order.number;
export const getIngredients = state => state.ingredients.addedIngredients;
export const getBun = state => state.ingredients.bun;
export const getBunId = state => state.ingredients.bun._id;

export const getCount = item => createSelector([getIngredients, getBunId], (ingredients, getBunId) => {
    if (item.type === 'bun') {
        if (item._id === getBunId) {
            return 2;
        } else {
            return 0;
        }
    } else {
        return ingredients.filter(ingredient => ingredient._id === item._id).length
    }
});