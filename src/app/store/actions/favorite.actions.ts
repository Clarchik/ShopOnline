import { Action } from '@ngrx/store';
import { CartProduct } from '../../shared/models/cart-product/cart-product';

export enum Actions {
    LOAD_FAVORITE = '[Favorite] Load Favorite',
    ADD_FAVORITE = '[Favorite] Add Favorite',
    REMOVE_FAVORITE = '[Favorite] Remove Favorite'
}


export class LoadProducts implements Action {
    readonly type = Actions.LOAD_FAVORITE;
    constructor(public payload: { [id: string]: CartProduct }) { }
}

export class AddProduct implements Action {
    readonly type = Actions.ADD_FAVORITE;
    constructor(public payload: CartProduct) { }
}

export class RemoveProduct implements Action {
    readonly type = Actions.REMOVE_FAVORITE;
    constructor(public payload: CartProduct) { }
}

export type FavoriteActions =
    LoadProducts |
    AddProduct |
    RemoveProduct;
