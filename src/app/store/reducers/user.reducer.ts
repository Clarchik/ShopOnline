import { User } from '../../shared/interfaces/user/user';

import { UserActions as UserActions } from '../actions';
import { AuthError } from '../../shared/interfaces/auth/auth-error';

export interface UserState {
    data: User | null;
    loggining: boolean;
    logged: boolean;
    error: AuthError;
    message: any;
}

export const initialState: UserState = {
    data: {},
    loggining: false,
    logged: false,
    error: {},
    message: ''
};

export function reducer(state = initialState, action: UserActions.UserActions): UserState {
    switch (action.type) {

        case UserActions.LOGIN_USER:
        case UserActions.UPDATE_USER_DATA: {
            return { ...state, loggining: true };
        }

        case UserActions.LOGIN_USER_SUCCESS:
        case UserActions.UPDATE_USER_DATA_SUCCESS: {
            const data = action.payload;
            return { ...state, data, loggining: false, logged: true };
        }

        case UserActions.LOGIN_USER_FAIL: {
            return { ...initialState, loggining: false, logged: false };
        }

        case UserActions.REGISTRATION_USER_SUCCESS: {
            const message = action.payload;
            return { ...initialState, loggining: false, logged: false, message };
        }

        case UserActions.REGISTRATION_USER_FAIL: {
            const message = action.payload;
            return { ...initialState, loggining: false, logged: false, message };
        }

        case UserActions.UPDATE_USER_DATA_FAIL: {
            return { ...state, loggining: false };
        }

        case UserActions.LOGOUT_USER_SUCCESS: {
            return initialState;
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
