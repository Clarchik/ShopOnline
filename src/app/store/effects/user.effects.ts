import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { User } from '../../shared/interfaces/user/user';

import * as userActions from '../actions/user.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private router: Router) { }


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
