import uniqid from 'uniqid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_CARD = 'MOVE_CARD';

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: { ...ingredient, uniqId: uniqid() }
})

export const deleteIngredient = (_id) => ({
    type: DELETE_INGREDIENT,
    payload: _id
})

export const moveCard = (dragIndex, hoverIndex) => ({
    type: MOVE_CARD,
    payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
    }
})
