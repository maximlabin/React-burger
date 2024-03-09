export const getIngredients = state => state.ingredients.addedIngredients;
export const getOrderNumber = state => state.order.order?.order.number;
export const getCount = item => state => state.ingredients.addedIngredients.filter((ingredient) => ingredient._id === item._id).length;
export const getData = state => state.ingredients;
export const isLoad = state => state.ingredients;
