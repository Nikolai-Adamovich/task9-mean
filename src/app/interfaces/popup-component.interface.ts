import { ViewRef } from '@angular/core';

export interface IPopupComponent {
  options: {
    type?: string,
    message?: string,
    closeTimeout?: number,
  };
  viewRef: ViewRef;
}
