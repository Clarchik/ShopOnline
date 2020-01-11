import { ActionReducerMap } from '@ngrx/store';

import * as userReducer from './user.reducer';
import * as cartReducer from './cart.reducer';

export interface ShopState {
    user: userReducer.UserState;
    cart: cartReducer.CartState;
}

export const reducers: ActionReducerMap<ShopState> = {
    user: userReducer.reducer,
    cart: cartReducer.reducer
};

export const getUserState = (state: ShopState) => state.user;
export const getCartState = (state: ShopState) => state.cart;
