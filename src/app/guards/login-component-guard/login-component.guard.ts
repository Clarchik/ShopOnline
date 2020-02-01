import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShopState, UserSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginComponentGuard implements CanActivate {
    constructor(
        private store: Store<ShopState>,
        private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select(UserSelectors.isUserLogged).pipe(
            switchMap((isLogged) => {
                if (isLogged) {
                    this.router.navigateByUrl('/main');
                    return of(false);
                } else {
                    return of(true);
                }
            })
        );
    }

}
