import { Action } from '@ngrx/store';
import { User } from '../../shared/interfaces/user/user';
import { Authenticate } from '../../shared/interfaces/user/authenticate';
import { AuthError } from '../../shared/interfaces/auth/auth-error';
import { UserData } from '../../shared/models/user/user-data';
import { UserPasswords } from '../../shared/models/user/user-passwords';

export const LOGIN_USER = '[Auth] Login User';
export const LOGIN_USER_SUCCESS = '[Auth] Login User Success';
export const LOGIN_USER_FAIL = '[Auth] Login User Fail';

export const LOGOUT_USER = '[Auth] Logout User';
export const LOGOUT_USER_SUCCESS = '[Auth] Logout User Success';

export const REGISTRATION_USER = '[Auth] Registration User';
export const REGISTRATION_USER_SUCCESS = '[Auth] Registration User Success';
export const REGISTRATION_USER_FAIL = '[Auth] Registration User Fail';

export const UPDATE_USER_DATA = '[Update] Update User Data';
export const UPDATE_USER_DATA_SUCCESS = '[Update] Update User Data Success';
export const UPDATE_USER_DATA_FAIL = '[Update] Update User Data Fail';

export const UPDATE_USER_PASSWORDS = '[Update] Update User Passwords';
export const UPDATE_USER_PASSWORDS_SUCCESS = '[Update] Update User Passwords Success';
export const UPDATE_USER_PASSWORDS_FAIL = '[Update] Update User Passwords Fail';


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

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class LogoutUserSuccess implements Action {
    readonly type = LOGOUT_USER_SUCCESS;
}

export class RegistrationUser implements Action {
    readonly type = REGISTRATION_USER;
    constructor(public payload: User) { }
}

export class RegistrationUserSuccess implements Action {
    readonly type = REGISTRATION_USER_SUCCESS;
    constructor(public payload: string) { }
}
export class RegistrationUserFail implements Action {
    readonly type = REGISTRATION_USER_FAIL;
    constructor(public payload: any) { }
}

export class UpdateUserData implements Action {
    readonly type = UPDATE_USER_DATA;
    constructor(public payload: UserData) { }
}

export class UpdateUserDataSuccess implements Action {
    readonly type = UPDATE_USER_DATA_SUCCESS;
    constructor(public payload: User) { }
}

export class UpdateUserDataFail implements Action {
    readonly type = UPDATE_USER_DATA_FAIL;
    constructor(public payload: any) { }
}

export class UpdateUserPasswords implements Action {
    readonly type = UPDATE_USER_PASSWORDS;
    constructor(public payload: { userPasswords: UserPasswords, id: string }) { }
}

export class UpdateUserPasswordsSuccess implements Action {
    readonly type = UPDATE_USER_PASSWORDS_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateUserPasswordsFail implements Action {
    readonly type = UPDATE_USER_PASSWORDS_FAIL;
    constructor(public payload: any) { }
}

export type UserActions =
    LoginUser |
    LoginUserSuccess |
    LoginUserFail |
    RegistrationUser |
    RegistrationUserSuccess |
    RegistrationUserFail |
    UpdateUserData |
    UpdateUserDataSuccess |
    UpdateUserDataFail |
    UpdateUserPasswords |
    UpdateUserPasswordsSuccess |
    UpdateUserPasswordsFail |
    LogoutUser |
    LogoutUserSuccess;
