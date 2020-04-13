import {Injectable, Injector} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SyncGuardHelperGuard implements CanActivate {
    public constructor(public injector: Injector) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const guards = route.data.syncGuards || [];

        for (const guard of guards) {
            const instance: CanActivate = this.injector.get(guard);
            let result = await instance.canActivate(route, state);
            if (result instanceof Observable) {
                result = await result.pipe(take(1)).toPromise();
            }
            if (result === false || result instanceof UrlTree) {
                return result;
            }
        }
        return true;
    }

}
