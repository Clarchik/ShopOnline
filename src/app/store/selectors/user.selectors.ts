import { createSelector } from '@ngrx/store';

import * as fromUserFeature from '../reducers/';
import * as userReducer from '../reducers/user.reducer';

export const getUser = createSelector(
    fromUserFeature.getUserState,
    userReducer.getUser
);

export const isUserLoading = createSelector(
    fromUserFeature.getUserState,
    userReducer.isUserLoading
);

export const isUserLogged = createSelector(
    fromUserFeature.getUserState,
    userReducer.isUserLogged
);

export const isNotUserLogged = createSelector(
    fromUserFeature.getUserState,
    userReducer.isUserNotLogged
);

