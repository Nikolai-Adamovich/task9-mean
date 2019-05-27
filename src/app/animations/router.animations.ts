import { trigger, animate, style, group, query, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter', style({
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: '1',
    })
    , { optional: true }),
    group([
      query(':enter', [
        style({
          transform: 'translateX(-100%)',
        }),
        animate('1s ease-in-out', style({
          transform: 'translateX(0)',
        })),
      ], { optional: true }),
      query(':leave', [
        style({
          opacity: '1',
        }),
        animate('1s ease-in-out', style({
          opacity: '0',
        })),
      ], { optional: true }),
    ])
  ])
]);
