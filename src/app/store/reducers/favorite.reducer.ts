import { FavoriteActions } from '../actions';
import { CartProduct } from '../../shared/models/cart-product/cart-product';

export interface FavoriteState {
    entities: { [id: string]: CartProduct };
    loading: boolean;
    loaded: boolean;
}

export const initialState: FavoriteState = {
    entities: {},
    loading: false,
    loaded: false
};

export function reducer(state = initialState, action: FavoriteActions.FavoriteActions): FavoriteState {
    switch (action.type) {

        case FavoriteActions.Actions.LOAD_FAVORITE: {
            const entities = action.payload;

            return {
                ...state,
                entities
            };
        }

        case FavoriteActions.Actions.ADD_FAVORITE: {
            const product = action.payload;
            const entities = {
                ...state.entities,
                [product.id]: product
            };

            localStorage.setItem('favoriteProducts', JSON.stringify(entities));

            return {
                ...state,
                entities
            };
        }

        case FavoriteActions.Actions.REMOVE_FAVORITE: {
            const product = action.payload;
            const { [product.id]: removed, ...entities } = state.entities;

            localStorage.setItem('favoriteProducts', JSON.stringify(entities));

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

export const getFavorites = (state: FavoriteState) => state.entities;
export const getFavoritesAsArray = (state: FavoriteState) => Object.values(state.entities);
export const favoritesLength = (state: FavoriteState) => Object.values(state.entities).length;
export const isFavoritesEmpty = (state: FavoriteState) => Object.values(state.entities).length <= 0;
export const isAlreadyFavorite = (state: FavoriteState, id: string) => {
    return !!state.entities[id];
};
