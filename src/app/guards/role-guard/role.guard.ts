import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ShopState, UserSelectors} from '../../store';
import {Store} from '@ngrx/store';
import {User} from '../../shared/interfaces/user/user';
import {switchMap, map} from 'rxjs/operators';
import {of, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private store: Store<ShopState>, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        const {expectedRole} = next.data;
        return this.store.select(UserSelectors.getUser).pipe(
            map((user: User) => expectedRole.includes(user.role)),
            switchMap((isAllowed: boolean) => {
                console.log(isAllowed, 'gg');
                if (!isAllowed) {
                    this.router.navigate(['/not-allowed']);
                }
                return of(isAllowed);
            })
        );
    }

}
