import { Injectable } from '@angular/core';
import { SCREEN_SIZE, } from '../../models/screen-size/screen-size';
import { SCREEN_COFIG } from '../../models/screen-size/screen-size-config';
import { SESSION } from '../../models/session/session';
import * as _ from 'lodash';

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

    public getAccessToken() {
        return localStorage.getItem(SESSION['x-access-token']);
    }

    public getRefreshToken() {
        return localStorage.getItem(SESSION['x-refresh-token']);
    }

    public getUserId() {
        return localStorage.getItem(SESSION._id);
    }

    public getPasswordDifficulty(password: string): string {
        const smallLetters = '([a-z]+)';
        const bigLetters = '([A-Z]+)';
        const numb = '([0-9]+)';
        const symbols = /\W/;
        let difficulty = '';
        let protect = 0;



        if (password.match(smallLetters)) {
            protect++;
        }
        if (password.match(bigLetters)) {
            protect++;
        }
        if (password.match(numb)) {
            protect++;
        }
        if (password.match(symbols)) {
            protect++;
        }

        switch (protect) {
            case 2:
                difficulty = 'common';
                break;
            case 3:
                difficulty = 'well';
                break;
            case 4:
                difficulty = 'super';
                break;
            default:
                difficulty = 'weak';
                break;
        }

        if (password.length < 8) {
            difficulty = '';
        }

        return difficulty;
    }

    public chunkArrayBySize(items: Array<any>, chunkSize: number) {
        return _.chunk(items, 3);
    }
}
