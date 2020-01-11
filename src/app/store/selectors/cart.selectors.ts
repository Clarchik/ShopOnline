import { createSelector } from '@ngrx/store';

import * as fromUserFeature from '../reducers/';
import * as cartReducer from '../reducers/cart.reducer';

export const getCart = createSelector(
    fromUserFeature.getCartState,
    cartReducer.getCart
);

export const getCartTotalPrice = createSelector(
    fromUserFeature.getCartState,
    cartReducer.getCartTotalPrice
);

export const getCartItemsLength = createSelector(
    fromUserFeature.getCartState,
    cartReducer.cartLength
);
