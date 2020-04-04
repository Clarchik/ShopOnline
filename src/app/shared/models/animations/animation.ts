import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn} from 'ng-animate';
import {swipeLeft, swipeRight} from './reusable-animation';

export const slideInAnimation =
    trigger('routeAnimation', [
        transition('MainPage => LoginPage', [
            useAnimation(swipeRight, {params: {time: '750ms'}})
        ]),
        transition('LoginPage => MainPage', [
            useAnimation(swipeLeft, {params: {time: '750ms'}})
        ]),
        transition('LoginPage => ProductDetPage', [
            useAnimation(swipeLeft, {params: {time: '750ms'}})
        ]),
        transition('ProductDetPage => LoginPage', [
            useAnimation(swipeRight, {params: {time: '750ms'}})
        ]),
        transition('RegPage => MainPage', [
            useAnimation(swipeLeft, {params: {time: '750ms'}})
        ]),
        transition('LoginPage => RegPage', [
            useAnimation(swipeRight, {params: {time: '750ms'}})
        ]),
        transition('RegPage => LoginPage', [
            useAnimation(swipeLeft, {params: {time: '750ms'}})
        ]),
        transition('LoginPage <=> ProductPage', [
            useAnimation(fadeIn)
        ]),
        transition('MainPage <=> ProductPage', [
            useAnimation(fadeIn)
        ]),
        transition('MainPage <=> ProductDetPage', [
            useAnimation(fadeIn)
        ]),
        transition('ProductPage => ProductDetPage', [
            useAnimation(swipeRight, {params: {time: '750ms'}})
        ]),
        transition('ProductDetPage => ProductPage', [
            useAnimation(swipeLeft, {params: {time: '750ms'}})
        ])
    ]);
