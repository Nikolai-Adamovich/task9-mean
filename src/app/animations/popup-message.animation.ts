import { trigger, animate, state, style, transition } from '@angular/animations';

export const popupMessageTransition = trigger('showHide', [
  state('hidden', style({
    opacity: 0,
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(50%)',
    }),
    animate('0.3s ease-in-out', style({
      opacity: 1,
      transform: 'translateY(0)',
    })),
  ]),
  transition('* => hidden', [
    animate('1s ease-in-out'),
  ]),
]);
