import { LoaderActions } from '../actions';

export interface LoaderState {
    status: boolean;
}

export const initialState: LoaderState = {
    status: false
};

export function reducer(state = initialState, action: LoaderActions.LoaderActions): LoaderState {
    switch (action.type) {
        case LoaderActions.Actions.SHOW_LOADER: {
            return {
                ...state,
                status: true
            };
        }

        case LoaderActions.Actions.HIDE_LOADER: {
            return {
                ...state,
                status: false
            };
        }

        default: {
            return {
                ...state
            };
        }
    }
}

export const notLoading = (state: LoaderState) => !state.status;
