import axios from "axios";
import { BASE_URL } from "../../utils/apiConfig.js";

export const GET_INGREDIENT_REQUEST = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_ERROR = 'GET_INGREDIENT_ERROR';

export const getIngredients = () => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: GET_INGREDIENT_REQUEST });
        try {
            const { data: response } = await axios.get(BASE_URL + '/ingredients');
            dispatch({ type: GET_INGREDIENT_SUCCESS, payload: response.data })
        } catch (error) {
            dispatch({ type: GET_INGREDIENT_ERROR, payload: error })
        }
        // setTimeout(async () => {
        //     try {
        //         const { data: response } = await axios.get(BASE_URL + '/ingredients');
        //         dispatch({ type: GET_INGREDIENT_SUCCESS, payload: response.data });
        //     } catch (error) {
        //         dispatch({ type: GET_INGREDIENT_ERROR, payload: error.message });
        //     }
        // }, 2000);
    }
    fetchData();
}