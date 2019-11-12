import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { User } from '../../shared/interfaces/user/user';

import * as userActions from '../actions/user.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private router: Router,
        private location: Location) { }


    @Effect()
    loginInUser$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER),
        map((action: userActions.LoginUser) => action.payload),
        switchMap(({ email, password }) => this.authService.signInWithEmailAndPassword(email, password)
            .pipe(
                map((user) => new userActions.LoginUserSuccess(user)),
                catchError((err) => of(new userActions.LoginUserFail({ message: err.error }))),
            )
        )
    );

    @Effect({ dispatch: false })
    loginInUserFailed$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER_FAIL),
        map((action: userActions.LoginUserFail) => action.payload),
        tap((error) => this.toastr.error(error.message))
    );

    @Effect()
    SignUpUser$ = this.actions$.pipe(
        ofType(userActions.REGISTRATION_USER),
        map((action: userActions.RegistrationUser) => action.payload),
            switchMap(({ email, password, name, surname }) => this.authService.signUpUser(email, password, name, surname).pipe(
                map((status) =>  new userActions.RegistrationUserSuccess(status.message)),
                // tslint:disable-next-line: ter-arrow-body-style
                catchError((err) => {
                    return of(new userActions.RegistrationUserFail(err));
                })
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




    @Effect({ dispatch: false })
    loginInUserSuccess$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER_SUCCESS),
        map((action: userActions.LoginUserSuccess) => action.payload),
        tap((data) => {
            // this.router.navigateByUrl('/main');
            this.toastr.success(`Hello ${data.email}`, 'Successfuly logged');
        })
    );
}
