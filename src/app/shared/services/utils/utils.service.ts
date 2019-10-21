import { Injectable } from '@angular/core';
import { SCREEN_SIZE, } from '../../models/screen-size/screen-size';
import { SCREEN_COFIG } from '../../models/screen-size/screen-size-config';

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
}
