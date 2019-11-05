import { query, style, group, animate, transition, trigger } from '@angular/animations';

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
        ])
    ]);
