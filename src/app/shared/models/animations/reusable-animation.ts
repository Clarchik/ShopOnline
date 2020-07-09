import { animation, style, query, animateChild, group, animate } from '@angular/animations';

export const swipeRight = animation([
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
        })
    ], { optional: true }),
    query(':enter', [
        style({ right: '-100%' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            animate('{{ time }} ease-out', style({ right: '100%' }))
        ], { optional: true }),
        query(':enter', [
            animate('{{ time }} ease-out', style({ right: '0%' }))
        ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
]);

export const swipeLeft = animation([
    style({ position: 'relative' }),
    query(':enter, :leave', [
        style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
        })
    ], { optional: true }),
    query(':enter', [
        style({ left: '-100%' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            animate('{{ time }} ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
            animate('{{ time }} ease-out', style({ left: '0%' }))
        ])
    ]),
    query(':enter', animateChild(), { optional: true }),
])
