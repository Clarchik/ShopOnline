import { ActionReducerMap } from '@ngrx/store';

import * as userReducer from './user.reducer';
import * as cartReducer from './cart.reducer';
import * as loaderReducer from './loader.reducer';
import * as favoriteReducer from './favorite.reducer';

export interface ShopState {
    user: userReducer.UserState;
    cart: cartReducer.CartState;
    loader: loaderReducer.LoaderState;
    favorite: favoriteReducer.FavoriteState;
}

export const reducers: ActionReducerMap<ShopState> = {
    user: userReducer.reducer,
    cart: cartReducer.reducer,
    loader: loaderReducer.reducer,
    favorite: favoriteReducer.reducer
};


export const getUserState = (state: ShopState) => state.user;
export const getCartState = (state: ShopState) => state.cart;
export const getLoaderState = (state: ShopState) => state.loader;
export const getFavoriteState = (state: ShopState) => state.favorite;
