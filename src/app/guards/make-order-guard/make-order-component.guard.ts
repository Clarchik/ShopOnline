import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, combineLatest, of} from 'rxjs';
import {ShopState, UserSelectors, CartSelectors} from '../../store';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MakeOrderGuard implements CanActivate {

    constructor(
        private store: Store<ShopState>,
        private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getFromStore()
            .pipe(
                switchMap((redirectUrl) => {
                    const canRedirect = !!redirectUrl.length;
                    if (redirectUrl.length) {
                        this.router.navigate([redirectUrl]);
                    }
                    return of(canRedirect);
                })
            );
    }

    private getFromStore(): Observable<string> {
        return combineLatest([
            this.store.select(UserSelectors.isUserLogged),
            this.store.select(CartSelectors.isCartNotEmpty)
        ]).pipe(
            map(([user, cart]: [boolean, boolean]) => {
                let redirectUrl = '';

                if (!user) {
                    redirectUrl = '/login';
                } else if (!cart) {
                    redirectUrl = '/products';
                }
                return redirectUrl;
            })
        );
    }

}
