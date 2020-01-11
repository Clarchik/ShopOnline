import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as cartAction from '../actions';
import { CartProduct } from '../../shared/models/cart-product/cart-product';
import { map, tap, switchMap } from 'rxjs/operators';

import * as fromStore from '../index';



@Injectable()
export class CartEffects {
    constructor(private actions$: Actions) { }

    // @Effect({ dispatch: false })
    // addProduct = this.actions$.pipe(
    //     ofType(cartAction.Actions.ADD_PRODUCT),

    // );
}
