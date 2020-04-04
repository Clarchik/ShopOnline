import {animation, style, query, animateChild, group, animate} from '@angular/animations';

export const swipeRight = animation([
    style({position: 'relative'}),
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
        })
    ]),
    query(':enter', [
        style({right: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('{{ time }} ease-out', style({right: '100%'}))
        ]),
        query(':enter', [
            animate('{{ time }} ease-out', style({right: '0%'}))
        ])
    ]),
    query(':enter', animateChild()),
]);

export const swipeLeft = animation([
    style({position: 'relative'}),
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
        })
    ]),
    query(':enter', [
        style({left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('{{ time }} ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
            animate('{{ time }} ease-out', style({left: '0%'}))
        ])
    ]),
    query(':enter', animateChild()),
])
