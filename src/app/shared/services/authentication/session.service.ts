import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {switchMap, map, catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service';
import {of} from 'rxjs';
import {User} from '../../interfaces/user/user';

import * as fromStore from '../../../store';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(
        private store: Store<fromStore.UserState>,
        private authService: AuthenticationService) {}

    findUserFromSessinon() {
        return new Promise<any>((resolve) => {
            this.authService.authState.pipe(
                switchMap((response) => {
                    if (response && response.uid) {
                        return this.authService.findUserDataByUid(response.uid);
                    } else {
                        return of(null);
                    }
                }),
                map((response) => {
                    if (response && response.data()) {
                        const user: User = response.data();
                        this.store.dispatch(new fromStore.LoginUserSuccess(user));
                    }
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
