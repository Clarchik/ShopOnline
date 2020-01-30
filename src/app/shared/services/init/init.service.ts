import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { of } from 'rxjs';

import { UserActions, ShopState } from '../../../store';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_NAMES } from '../../models/languages/language-names';

@Injectable({
    providedIn: 'root'
})
export class InitService {

    constructor(
        private store: Store<ShopState>,
        private authService: AuthenticationService,
        private translate: TranslateService) { }

    public findUserFromSessinon() {
        return new Promise<any>((resolve) => {
            this.authService.signInFromSession().pipe(
                map((user) => {
                    this.store.dispatch(new UserActions.LoginUserSuccess(user));
                    resolve(true);
                }),
                catchError((err) => {
                    resolve(true);
                    return of(err);
                })
            ).subscribe();
        });
    }

    public setLanguage() {
        return new Promise<any>((resolve) => {
            const language: LANGUAGE_NAMES = LANGUAGE_NAMES[localStorage.getItem('language')];
            this.translate.use(language ? language : 'en');
            resolve(true);
        });
    }
}
