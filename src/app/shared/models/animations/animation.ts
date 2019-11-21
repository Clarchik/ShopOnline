import { query, style, group, animate, transition, trigger, useAnimation } from '@angular/animations';
import { flipInY, fadeInDown, zoomInLeft, zoomIn, rollIn, flipInX, zoomInDown, rotateInUpRight, slideInDown, flip, slideInLeft, lightSpeedIn, bounce, bounceInDown, slideInUp } from 'ng-animate';

export const slideInAnimation =
    trigger('routeAnimation', [
        transition('swipeLeft => swipeRight', [
            query(':enter', style({ transform: 'translateX(100%)' })),
            group([
                query(':leave', [
                    animate('0.5s cubic-bezier(.35, 0, .25,1)', style({ transform: 'translateX(-100%)' })),
                ]),
                query(':enter', animate('0.5s cubic-bezier(.35, 0, .25,1)', style({ transform: 'translateX(0%)' }))),
            ]),
        ]),
        transition('swipeRight => swipeLeft', [
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', [
                    animate('0.5s cubic-bezier(.35, 0, .25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                query(':enter', animate('0.5s cubic-bezier(.35, 0, .25,1)', style({ transform: 'translateX(0%)' }))),
            ]),
        ]),
        transition('swipeLeft <=> swipeRight', [
            style({ height: '100%', position: 'relative' }),
            query(':enter, :leave', [
                style({ position: 'absolute', top: 0, left: 0, right: 0 })
            ])
        ]),
        transition('swipeRight <=> FlipY', [
            useAnimation(flipInY)
        ]),
        transition('swipeLeft <=> FlipY', [
            query(':enter', style({ transform: 'translateX(-100%)' })),
            group([
                query(':leave', [
                    animate('0.5s cubic-bezier(.35, 0, .25,1)', style({ transform: 'translateX(100%)' })),
                ]),
                query(':enter', animate('0.5s cubic-bezier(.35, 0, .25,1)', style({ transform: 'translateX(0%)' }))),
            ]),
        ])
    ]);
