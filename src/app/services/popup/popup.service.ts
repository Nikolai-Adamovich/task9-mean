import { Injectable, ViewRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class PopupService {
  private popupDialog = new ReplaySubject<{ popupEvent: string, component?: any, options?: {}, viewRef?: ViewRef }>();
  public popupDialog$ = this.popupDialog.asObservable();

  open(component: any, options?: any) {
    this.popupDialog.next({ popupEvent: 'open', component, options });
  }

  close(viewRef: ViewRef) {
    this.popupDialog.next({ popupEvent: 'close', viewRef });
  }

}
