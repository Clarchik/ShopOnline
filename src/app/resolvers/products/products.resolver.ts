import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {ShopState, CartSelectors} from '../../store';
import {Store} from '@ngrx/store';
import {CartProduct} from '../../shared/models/cart-product/cart-product';
import {take} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<Observable<CartProduct[]>> {
    constructor(private store: Store<ShopState>) { }

    resolve(): Observable<CartProduct[]> {
        return this.store.select(CartSelectors.getCartItemsAsArray).pipe(take(1));
    }
}
