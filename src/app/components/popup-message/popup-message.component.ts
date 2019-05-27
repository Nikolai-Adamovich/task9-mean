import { Component, Input, OnInit  } from '@angular/core';
import { PopupService } from '../../services/popup/popup.service';
import { popupMessageTransition } from '../../animations/popup-message.animation';
import { IPopupComponent } from '../../interfaces/popup-component.interface';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
  animations: [ popupMessageTransition ],
})
export class PopupMessageComponent implements OnInit {
  @Input() options: IPopupComponent['options'];
  @Input() viewRef: IPopupComponent['viewRef'];
  showHideTriggerState: string;

  constructor(private popupService: PopupService) { }

  close() {
    this.popupService.close(this.viewRef);
  }

  ngOnInit() {
    if (isFinite(this.options.closeTimeout) && this.options.closeTimeout > 0) {
      // Close popup on timeout (Run close animation)
      setTimeout(() => {
        this.showHideTriggerState = 'hidden';
      }, this.options.closeTimeout * 1000);
    }
  }

  showHideTransitionDone() {
    // Close popup when hide transition is done
    if (this.showHideTriggerState) {
      this.popupService.close(this.viewRef);
    }
  }

}
