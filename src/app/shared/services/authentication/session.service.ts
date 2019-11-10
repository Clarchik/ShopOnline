import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { of } from 'rxjs';
import { User } from '../../interfaces/user/user';

import * as fromStore from '../../../store';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(
        private store: Store<fromStore.UserState>,
        private authService: AuthenticationService) { }

    public findUserFromSessinon() {
        return new Promise<any>((resolve) => {
            this.authService.signInFromSession().pipe(
                map((user) => {
                    this.store.dispatch(new fromStore.LoginUserSuccess(user));
                    resolve(true);
                }),
                catchError((err) => {
                    resolve(true);
                    return of(err);
                })
            ).subscribe();
        });
    }
}
