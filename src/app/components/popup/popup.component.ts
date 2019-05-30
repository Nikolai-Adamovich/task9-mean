import { Component, AfterViewInit, ComponentFactoryResolver, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../../services/popup/popup.service';
import { PopupDirective } from '../../directives/popup/popup.directive';
import { IPopupComponent } from '../../interfaces/popup-component.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription;
  @ViewChild(PopupDirective, { static: false }) popupDirective: PopupDirective;

  constructor(private popupService: PopupService, private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) { }
  ngAfterViewInit() {
    this.subscription = this.popupService.popupDialog$.subscribe((data) => {
      if (!!data && data.popupEvent === 'open') {
        this.open(data);
      } else if (data &&
        (data.popupEvent === 'close')
      ) {
        this.close(data.viewRef);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  open(data: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.component);
    this.viewContainerRef = this.popupDirective.viewContainerRef;
    // this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as IPopupComponent).options = data.options;
    (componentRef.instance as IPopupComponent).viewRef = componentRef.hostView;
  }

  close(viewRef: IPopupComponent['viewRef']) {
    const currentIndex = this.viewContainerRef.indexOf(viewRef);
    this.viewContainerRef.detach(currentIndex);
  }

}
