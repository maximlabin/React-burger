import { store } from '../store';
import { TIngredientResponse } from '../../services/actions/getIngredients';
import { TIngredientAction } from '../../services/actions/index';
import { TModalAction } from '../../services/actions/modal';
import { TOrder } from '../../services/actions/order';
import { TUser } from '../actions/user';
import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
    | TIngredientResponse
    | TIngredientAction
    | TModalAction
    | TOrder
    | TUser;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type appDispatch = typeof store.dispatch