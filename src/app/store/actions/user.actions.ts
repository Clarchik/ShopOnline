import { Action } from '@ngrx/store';
import { User } from '../../shared/interfaces/user/user';
import { Authenticate } from '../../shared/interfaces/user/authenticate';
import { AuthError } from '../../shared/interfaces/auth/auth-error';

export const LOGIN_USER = '[Auth] Login User';
export const LOGIN_USER_SUCCESS = '[Auth] Login User Success';
export const LOGIN_USER_FAIL = '[Auth] Login User Fail';

export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: Authenticate) { }
}

export class LoginUserSuccess implements Action {
    readonly type = LOGIN_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class LoginUserFail implements Action {
    readonly type = LOGIN_USER_FAIL;
    constructor(public payload: AuthError) { }
}

export type UserActions = LoginUser | LoginUserSuccess | LoginUserFail;
