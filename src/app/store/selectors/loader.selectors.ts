import { createSelector } from '@ngrx/store';
import { getLoaderState } from '../reducers/';
import * as loaderReducer from '../reducers/loader.reducer';

export const notLoadingStatus = createSelector(
    getLoaderState,
    loaderReducer.notLoading
);
