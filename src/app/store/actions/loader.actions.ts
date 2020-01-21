import { Action } from '@ngrx/store';

export enum Actions {
    SHOW_LOADER = '[Loader] Show Loader',
    HIDE_LOADER = '[Loader] Hide Loader'
}

export class ShowLoader implements Action {
    readonly type = Actions.SHOW_LOADER;
}

export class HideLoader implements Action {
    readonly type = Actions.HIDE_LOADER;
}

export type LoaderActions =
    ShowLoader |
    HideLoader;
