import { Injectable } from '@angular/core';
import { SCREEN_SIZE, } from '../../models/screen-size/screen-size';
import { SCREEN_COFIG } from '../../models/screen-size/screen-size-config';
import { SESSION } from '../../models/session/session';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() { }

    public getScreenSizeByWidth(width: number): SCREEN_SIZE {
        if (width <= SCREEN_COFIG.xs.max) {
            return SCREEN_SIZE.xs;
        } else if (width >= SCREEN_COFIG.sm.min && width <= SCREEN_COFIG.sm.max) {
            return SCREEN_SIZE.sm;
        } else if (width >= SCREEN_COFIG.md.min && width <= SCREEN_COFIG.md.max) {
            return SCREEN_SIZE.md;
        } else if (width >= SCREEN_COFIG.lg.min && width <= SCREEN_COFIG.lg.max) {
            return SCREEN_SIZE.lg;
        } else if (width >= SCREEN_COFIG.xl.min) {
            return SCREEN_SIZE.xl;
        }
    }

    public setSession(id: string, accessToken: string, refreshToken: string) {
        localStorage.setItem(SESSION._id, id);
        localStorage.setItem(SESSION['x-access-token'], accessToken);
        localStorage.setItem(SESSION['x-refresh-token'], refreshToken);
    }

    public removeSession() {
        localStorage.removeItem(SESSION._id);
        localStorage.removeItem(SESSION['x-access-token']);
        localStorage.removeItem(SESSION['x-refresh-token']);
    }

    getAccessToken() {
        return localStorage.getItem(SESSION['x-access-token']);
    }

    getRefreshToken() {
        return localStorage.getItem(SESSION['x-refresh-token']);
    }

    getUserId() {
        return localStorage.getItem(SESSION._id);
    }
}
