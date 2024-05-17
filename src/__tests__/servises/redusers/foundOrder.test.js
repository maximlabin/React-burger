import { foundOrderReducer } from "../../../services/reducers/foundOrder-reducer";
import { GET_FOUND_ORDER_REQUEST, GET_FOUND_ORDER_SUCCESS } from "../../../services/constants";
import { initialState } from "../../../services/reducers/foundOrder-reducer";

describe('check getFoundOrder func', () => {
    it('should return the initial state', () => {
        expect(foundOrderReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_FOUND_ORDER_REQUEST', () => {
        expect(foundOrderReducer(initialState, {
            type: GET_FOUND_ORDER_REQUEST
        })).toEqual({
            ...initialState,
            isLoading: true
        });
    });

    it('should handle GET_FOUND_ORDER_SUCCESS', () => {
        const fakeOrderPayload = {
            orders: [{
                _id: "6644791497ede0001d06ad2d",
                name: "Краторный space spicy антарианский бургер",
                status: 'done',
                number: 40086,
                ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa0943"],
                createdAt: "2024-05-14T12:00:00Z",
                updatedAt: "2024-05-14T12:00:00Z"
            }],
            success: true,
        };
        expect(foundOrderReducer(initialState, {
            type: GET_FOUND_ORDER_SUCCESS,
            payload: fakeOrderPayload
        })).toEqual({
            ...initialState,
            isLoading: false,
            foundOrder: fakeOrderPayload
        });
    });


});