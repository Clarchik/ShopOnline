import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { ShopState, UserSelectors, CartSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private store: Store<ShopState>,
        private router: Router) { }

    private getFromStore(): Observable<{ can: boolean, url: string }> {
        return combineLatest([
            this.store.select(UserSelectors.isUserLogged),
            this.store.select(CartSelectors.isCartNotEmpty)
        ]).pipe(
            map(([user, cart]: [boolean, boolean]) => {
                console.log('123123123');
                const obj = {
                    url: '',
                    can: false
                };

                if (!user) {
                    obj.url = '/login';
                } else if (!cart) {
                    obj.url = '/products';
                } else {
                    obj.can = true;
                }
                return obj;
            })
        );
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getFromStore()
            .pipe(
                switchMap((value) => {
                    if (value.url) {
                        this.router.navigate([value.url]);
                    }
                    return of(value.can);
                })
            );
    }

}
