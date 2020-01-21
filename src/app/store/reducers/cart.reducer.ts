import { CartActions } from '../actions';
import { CartProduct } from '../../shared/models/cart-product/cart-product';

export interface CartState {
    entities: { [id: string]: CartProduct };
    loading: boolean;
    loaded: boolean;
}

export const initialState: CartState = {
    entities: {},
    loading: false,
    loaded: false
};

export function reducer(state = initialState, action: CartActions.CartActions): CartState {
    switch (action.type) {

        case CartActions.Actions.LOAD_PRODUCTS: {
            const entities = action.payload;

            return {
                ...state,
                entities
            };
        }

        case CartActions.Actions.ADD_PRODUCT: {
            const product = action.payload;
            const entities = {
                ...state.entities,
                [`${product.id}${product.size}`]: product
            };

            localStorage.setItem('cartProducts', JSON.stringify(entities));

            return {
                ...state,
                entities
            };
        }

        case CartActions.Actions.REMOVE_PRODUCT: {
            const product = action.payload;
            const productId = `${product.id}${product.size}`;
            const { [productId]: removed, ...entities } = state.entities;

            localStorage.setItem('cartProducts', JSON.stringify(entities));

            return {
                ...state,
                entities
            };
        }

        default: {
            return state;
        }

    }
}


export const getCart = (state: CartState) => state.entities;
export const getCartAsArray = (state: CartState) => Object.values(state.entities);
export const getCartTotalPrice = (state: CartState) => Object.values(state.entities).reduce((prev, next) => prev + (next.qunatity * next.price), 0);
export const cartLength = (state: CartState) => Object.values(state.entities).length;
export const isEmptyCart = (state: CartState) => Object.values(state.entities).length <= 0;
