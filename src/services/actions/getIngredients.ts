import { Dispatch } from "redux";
import { axiosInstance } from "../../services/axios";
import { TIngredientItem } from "../../services/types/data";

export const GET_INGREDIENT_REQUEST: 'GET_INGREDIENT_REQUEST' = 'GET_INGREDIENT_REQUEST';
export const GET_INGREDIENT_SUCCESS: 'GET_INGREDIENT_SUCCESS' = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_ERROR: 'GET_INGREDIENT_ERROR' = 'GET_INGREDIENT_ERROR';


export interface IGetIngredientRequest {
    readonly type: typeof GET_INGREDIENT_REQUEST;
}

export interface IGetIngredientSuccess {
    readonly type: typeof GET_INGREDIENT_SUCCESS;
    readonly payload: TIngredientItem;
}

export interface IGetIngredientError {
    readonly type: typeof GET_INGREDIENT_ERROR;
    readonly payload: string;
}

export type TIngredientResponse = IGetIngredientRequest | IGetIngredientSuccess | IGetIngredientError;

export const getIngredients = () => (dispatch: Dispatch) => {
    const fetchData = async () => {
        dispatch({ type: GET_INGREDIENT_REQUEST });
        try {
            const { data: response } = await axiosInstance.get('/ingredients');
            dispatch({ type: GET_INGREDIENT_SUCCESS, payload: response.data })
        } catch (error) {
            dispatch({ type: GET_INGREDIENT_ERROR, payload: error })
        }
    }
    fetchData();
}
