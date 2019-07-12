import { Injectable, ViewRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class PopupService {
  private popupDialog = new ReplaySubject<{ popupEvent: string, component?: ComponentType<unknown>, options?: {}, viewRef?: ViewRef }>();
  public popupDialog$ = this.popupDialog.asObservable();

  open(component: ComponentType<unknown>, options?: any) {
    this.popupDialog.next({ popupEvent: 'open', component, options });
  }

  close(viewRef: ViewRef) {
    this.popupDialog.next({ popupEvent: 'close', viewRef });
  }

}
