import { ActionReducerMap } from '@ngrx/store';

import * as userReducer from './user.reducer';

export interface ShopState {
    user: userReducer.UserState;
}

export const reducers: ActionReducerMap<ShopState> = {
    user: userReducer.reducer
};

export const getUserState = (state: ShopState) => state.user;
