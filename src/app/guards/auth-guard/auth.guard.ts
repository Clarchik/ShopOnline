import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShopState, UserSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<ShopState>, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(UserSelectors.isUserLogged).pipe(
            switchMap((logged) => {
                if (logged) {
                    return of(true);
                } else {
                    this.router.navigate(['/login'], {
                        queryParams: {
                            return: state.url
                        }
                    });
                    return of(false);
                }
            })
        );
    }
}
