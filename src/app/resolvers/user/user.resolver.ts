import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../shared/interfaces/user/user';
import {ShopState, UserSelectors} from '../../store';
import {Store} from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<Observable<User>> {
    constructor(private store: Store<ShopState>) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.store.select(UserSelectors.getUser);
    }
}
