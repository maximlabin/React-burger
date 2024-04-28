import { appDispatch } from "../../services/types";
import { axiosInstance } from "../../services/axios";
import { TIngredientItem } from "../../services/types/data";

import {
    GET_INGREDIENT_REQUEST,
    GET_INGREDIENT_SUCCESS,
    GET_INGREDIENT_ERROR
} from "../constants";


export interface IGetIngredientRequest {
    readonly type: typeof GET_INGREDIENT_REQUEST;
}

export interface IGetIngredientSuccess {
    readonly type: typeof GET_INGREDIENT_SUCCESS;
    readonly payload: TIngredientItem;
}

export interface IGetIngredientError {
    readonly type: typeof GET_INGREDIENT_ERROR;
    readonly payload: unknown;
}

export type TIngredientResponse = IGetIngredientRequest | IGetIngredientSuccess | IGetIngredientError;

export const getIngredients = () => (dispatch: appDispatch) => {
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
