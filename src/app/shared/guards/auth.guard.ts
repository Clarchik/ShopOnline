import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShopState, UserSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<ShopState>,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select(UserSelectors.isUserLogged).pipe(
            switchMap((logged) => {
                if (logged) {
                    return of(true);
                } else {
                    this.router.navigateByUrl('login');
                    return of(false);
                }
            })
        );
    }
}
