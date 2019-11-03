import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { User } from '../../shared/interfaces/user/user';

import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private toastr: ToastrService) { }


    @Effect()
    loginInUser$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER),
        map((action: userActions.LoginUser) => action.payload),
        switchMap(({ email, password }) => this.authService.loginUserWithEmailAndPassword(email, password)
            .pipe(
                switchMap(({ user }) => this.authService.findUserDataByUid(user.uid).pipe(
                    map((doc) => {
                        if (doc && doc.data()) {
                            const userData: User = doc.data();
                            return new userActions.LoginUserSuccess(userData);
                        } else {
                            return new userActions.LoginUserFail({});
                        }
                    }),
                    catchError((err) => of(new userActions.LoginUserFail(err)))
                )),
                catchError((err) => of(new userActions.LoginUserFail(err))),
            )
        )
    );

    // @Effect({dispatch: false})
    // loginInUserFailed$ = this.actions$.pipe(
    //     ofType(userActions.LOGIN_USER_FAIL),
    //     map((action: userActions.LoginUserFail) => action.payload),
    //     tap((error) => {
    //         this.toastr.error(error.code);
    //     })
    // );

    @Effect({ dispatch: false })
    loginInUserSuccess$ = this.actions$.pipe(
        ofType(userActions.LOGIN_USER_SUCCESS),
        map((action: userActions.LoginUserSuccess) => action.payload),
        tap((data) => {
            this.toastr.success(`Hello ${data.name}`, 'Successfuly logged');
        })
    );
}
