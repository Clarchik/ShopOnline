import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ShopState, UserSelectors} from '../../store';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class UserLoggedResolver implements Resolve<Observable<boolean>> {
    constructor(private store: Store<ShopState>) {}

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.store.select(UserSelectors.isUserLogged);
    }
}
