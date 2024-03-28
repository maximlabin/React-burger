import { instance } from "../axios";

export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_ERROR = 'GET_INGREDIENT_ERROR';

export const getIngredients = () => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: GET_INGREDIENT_REQUEST });
        try {
            const { data: response } = await instance.get('/ingredients');
            dispatch({ type: GET_INGREDIENT_SUCCESS, payload: response.data })
        } catch (error) {
            dispatch({ type: GET_INGREDIENT_ERROR, payload: error })
        }
    }
    fetchData();
}