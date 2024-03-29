import { clearIngredients } from "./index.js";
import { axiosInstance } from "../axios.js";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const addOrder = (data) => (dispatch) => {
    const fetchData = async () => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const response = await axiosInstance.post(`/orders`, {
                ingredients: data,
            });

            const responseData = response.data;

            if (responseData.success) {
                dispatch({ type: CREATE_ORDER_SUCCESS, payload: responseData });
                dispatch(clearIngredients())
                return responseData;
            } else {
                throw new Error('Order creation failed');
            }
        } catch (error) {
            dispatch({ type: CREATE_ORDER_ERROR, payload: error.message });
        }
    };

    return fetchData();
};