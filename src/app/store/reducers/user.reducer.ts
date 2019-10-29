import { User } from '../../shared/interfaces/user/user';

import * as fromUser from '../actions';
import { AuthError } from '../../shared/interfaces/auth/auth-error';

export interface UserState {
    data: User | null;
    loggining: boolean;
    logged: boolean;
    error: AuthError;
}

export const initialState: UserState = {
    data: {},
    loggining: false,
    logged: false,
    error: {}
};

export function reducer(state = initialState, action: fromUser.UserActions): UserState {
    switch (action.type) {

        case fromUser.LOGIN_USER: {
            return { ...state, loggining: true };
        }

        case fromUser.LOGIN_USER_SUCCESS: {
            const data = action.payload;
            return { ...state, data, loggining: false, logged: true };
        }

        case fromUser.LOGIN_USER_FAIL: {
            return { ...initialState, loggining: false, logged: false };
        }

        default: {
            return state;
        }
    }
}

export const getUser = (state: UserState) => state.data;
export const isUserLoading = (state: UserState) => state.loggining;
export const isUserLogged = (state: UserState) => state.logged;
export const isUserNotLogged = (state: UserState) => !state.logged;
