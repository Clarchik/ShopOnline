import { Action } from '@ngrx/store';
import { User } from '../../shared/interfaces/user/user';
import { Authenticate } from '../../shared/interfaces/user/authenticate';
import { AuthError } from '../../shared/interfaces/auth/auth-error';

export const LOGIN_USER = '[Auth] Login User';
export const LOGIN_USER_SUCCESS = '[Auth] Login User Success';
export const LOGIN_USER_FAIL = '[Auth] Login User Fail';
export const REGISTRATION_USER = '[Auth] Registration User';
export const REGISTRATION_USER_SUCCESS = '[Auth] Registration User Success';
export const REGISTRATION_USER_FAIL = '[AUTH] Registration User Fail';

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

export class RegistrationUser implements Action {
    readonly type = REGISTRATION_USER;
    constructor(public payload: User) {}
}

export class RegistrationUserSuccess implements Action {
    readonly type = REGISTRATION_USER_SUCCESS;
    constructor(public payload: string) {}
}
export class RegistrationUserFail implements Action {
    readonly type = REGISTRATION_USER_FAIL;
    constructor(public payload: any) {}
}



export type UserActions = LoginUser | LoginUserSuccess | LoginUserFail | RegistrationUser | RegistrationUserSuccess | RegistrationUserFail;
