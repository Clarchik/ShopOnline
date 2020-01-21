import * as fromUserFeature from '../reducers/';
import * as favoriteReducer from '../reducers/favorite.reducer';
import { createSelector } from '@ngrx/store';

export const getFavorite = createSelector(
    fromUserFeature.getFavoriteState,
    favoriteReducer.getFavorites
);

export const getFavoriteItemsLength = createSelector(
    fromUserFeature.getFavoriteState,
    favoriteReducer.favoritesLength
);

export const getFavoriteItemsAsArray = createSelector(
    fromUserFeature.getFavoriteState,
    favoriteReducer.getFavoritesAsArray
);

export const isFavoritesEmpty = createSelector(
    fromUserFeature.getFavoriteState,
    favoriteReducer.isFavoritesEmpty
);

export const isAlreadyFavorite = (id: string) => createSelector(
    fromUserFeature.getFavoriteState,
    () => id,
    favoriteReducer.isAlreadyFavorite
);
