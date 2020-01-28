import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { User } from '../../shared/interfaces/user/user';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private translate: TranslateService,
        private toastr: ToastrService,
        private router: Router) { }

    /* LOGIN */

    @Effect()
    loginInUser$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER),
        map((action: userActions.LoginUser) => action.payload),
        switchMap(({ email, password }) => this.authService.signInWithEmailAndPassword(email, password)
            .pipe(
                map((user) => new userActions.LoginUserSuccess(user)),
                catchError(({ error }) => of(new userActions.LoginUserFail({ message: error.message }))),
            )
        )
    );

    @Effect({ dispatch: false })
    loginInUserSuccess$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER_SUCCESS),
        map((action: userActions.LoginUserSuccess) => action.payload),
        tap((data) => {
            // this.router.navigateByUrl('/main');
            this.toastr.success(`${this.translate.instant('Shared.hello')}, ${data.email}`, `${this.translate.instant('Authorization.success')}`);
        })
    );

    @Effect({ dispatch: false })
    loginInUserFailed$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER_FAIL),
        map((action: userActions.LoginUserFail) => action.payload),
        tap((error) => this.toastr.error(error.message, this.translate.instant('Authorization.fail')))
    );

    /* LOGOUT */
    @Effect()
    logoutUser = this.actions$.pipe(
        ofType(userActions.LOGOUT_USER),
        tap(() => {
            this.router.navigateByUrl('/main');
            return this.authService.logoutUser();
        }),
        map(() => ({ type: userActions.LOGOUT_USER_SUCCESS }))
    );

    /* REGISTRATION */

    @Effect()
    SignUpUser$ = this.actions$.pipe(
        ofType(userActions.REGISTRATION_USER),
        map((action: userActions.RegistrationUser) => action.payload),
        switchMap(({ email, password, name, surname }) => this.authService.signUpUser(email, password, name, surname).pipe(
            map((status) => new userActions.RegistrationUserSuccess(status.message)),
            catchError((err) => of(new userActions.RegistrationUserFail(err)))
        ))
    );

    @Effect({ dispatch: false })
    SignUpSuccess$ = this.actions$.pipe(
        ofType(userActions.REGISTRATION_USER_SUCCESS),
        map((action: userActions.RegistrationUserSuccess) => action.payload),
        tap((data) => {
            this.toastr.success('', `${data}`);
            // LOCATION AND ROUTER DOESN'T WORKK , THAT'S WHY I MADE SIMPLE MOOVE, BUT SHOUD REMAKE IT !
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        })
    );

    @Effect({ dispatch: false })
    SignUpFail$ = this.actions$.pipe(
        ofType(userActions.REGISTRATION_USER_FAIL),
        map((action: userActions.RegistrationUserFail) => action.payload),
        tap((data) => {
            if (typeof data.error === 'object') {
                this.toastr.error(`${data.error.message}`, 'Sorry dude :(');
            } else {
                this.toastr.error(`${data.error}`, 'Sorry dude :(');
            }
        })
    );

    /* PROFILE DATA UPDATE */

    @Effect()
    updateUserData = this.actions$.pipe(
        ofType(userActions.UPDATE_USER_DATA),
        map((action: userActions.UpdateUserData) => action.payload),
        switchMap((userData) => this.authService.updateUserData(userData).pipe(
            map((user: User) => new userActions.UpdateUserDataSuccess(user)),
            catchError((err) => of(new userActions.UpdateUserDataFail(err.error)))
        ))
    );

    @Effect({ dispatch: false })
    updateUserDataSuccess = this.actions$.pipe(
        ofType(userActions.UPDATE_USER_DATA_SUCCESS),
        tap(() => {
            this.toastr.success('Success', 'Data is updated');
        })
    );

    @Effect({ dispatch: false })
    updateUserDataFail = this.actions$.pipe(
        ofType(userActions.UPDATE_USER_DATA_FAIL),
        map((action: userActions.UpdateUserDataFail) => action.payload),
        tap((err) => {
            this.toastr.error(`${err.message}`, `Error`);
        })
    );

    /* PROFILE PASSWORDS UPDATE */
    @Effect()
    updateUserPasswords = this.actions$.pipe(
        ofType(userActions.UPDATE_USER_PASSWORDS),
        map((action: userActions.UpdateUserPasswords) => action.payload),
        switchMap((userData) => this.authService.updateUserPasswords(userData.userPasswords, userData.id).pipe(
            map((response) => new userActions.UpdateUserPasswordsSuccess(response)),
            catchError((err) => of(new userActions.UpdateUserPasswordsFail(err.error)))
        ))
    );

    @Effect({ dispatch: false })
    updateUserPasswordsSuccess = this.actions$.pipe(
        ofType(userActions.UPDATE_USER_PASSWORDS_SUCCESS),
        map((action: userActions.UpdateUserDataSuccess) => action.payload),
        tap((response: any) => {
            this.toastr.success(`${response.message}`, `Success`);
        })
    );

    @Effect({ dispatch: false })
    updateUserPasswordsFail = this.actions$.pipe(
        ofType(userActions.UPDATE_USER_PASSWORDS_FAIL),
        map((action: userActions.UpdateUserPasswordsFail) => action.payload),
        tap((response: any) => {
            this.toastr.error(`${response.message}`, 'Fail');
        })
    );
}
