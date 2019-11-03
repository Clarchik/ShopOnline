import { ActionReducerMap } from '@ngrx/store';

import * as userReducer from './user.reducer';

export interface UserState {
    user: userReducer.UserState;
}

export const reducers: ActionReducerMap<UserState> = {
    user: userReducer.reducer
};

export const getUserState = (state: UserState) => state.user;
