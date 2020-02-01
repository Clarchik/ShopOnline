import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CartActions } from '../actions';
import { tap, switchMap } from 'rxjs/operators';
import { CartSelectors } from '../selectors';
import { ShopState } from '../reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';





@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private store: Store<ShopState>,
        private router: Router) { }

    @Effect({ dispatch: false })
    removeProduct = this.actions$.pipe(
        ofType(CartActions.Actions.REMOVE_PRODUCT),
        switchMap(() => this.store.select(CartSelectors.isCartEmpty)),
        tap((isEmpty) => {
            if (isEmpty && this.router.url === '/make-order') {
                this.router.navigate(['/products']);
            }
        })
    );
}
