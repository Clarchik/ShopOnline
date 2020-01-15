import { Action } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';

export enum Actions {
    LOAD_PRODUCTS = '[Cart] Load Products',
    ADD_PRODUCT = '[Cart] Add Product',
    REMOVE_PRODUCT = '[Cart] Remove Product'
}

export class LoadProducts implements Action {
    readonly type = Actions.LOAD_PRODUCTS;
    constructor(public payload: { [id: string]: CartProduct }) { }
}

export class AddProduct implements Action {
    readonly type = Actions.ADD_PRODUCT;
    constructor(public payload: CartProduct) { }
}

export class RemoveProduct implements Action {
    readonly type = Actions.REMOVE_PRODUCT;
    constructor(public payload: CartProduct) { }
}

export type CartActions =
    LoadProducts |
    AddProduct |
    RemoveProduct;
