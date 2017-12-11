import { animate, style, transition, trigger } from '@angular/animations';

const ANIMATION_TIME = '.2s';

export const AlertAnimation = trigger('alertAnimation', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(ANIMATION_TIME, style({
            opacity: 1
        }))
    ]),

    transition(':leave', [
        style({
            opacity: 1
        }),
        animate(ANIMATION_TIME, style({
            opacity: 0
        }))
    ])
]);
