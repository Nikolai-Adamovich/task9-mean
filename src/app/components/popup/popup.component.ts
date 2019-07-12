import { Component, AfterViewInit, ComponentFactoryResolver, OnDestroy, ViewContainerRef, ViewChild, ViewRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../../services/popup/popup.service';
import { IPopupComponent } from '../../interfaces/popup-component.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription;
  @ViewChild('container', {
    static: false,
    read: ViewContainerRef,
  }) viewContainerRef: ViewContainerRef;

  constructor(private popupService: PopupService, private componentFactoryResolver: ComponentFactoryResolver) { }
  ngAfterViewInit() {
    this.subscription = this.popupService.popupDialog$.subscribe((data) => {
      if (!!data && data.popupEvent === 'open') {
        this.open(data);
      } else if (data && data.popupEvent === 'close') {
        this.close(data.viewRef);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  open(data: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.component);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as IPopupComponent).options = data.options;
    (componentRef.instance as IPopupComponent).viewRef = componentRef.hostView;
  }

  close(viewRef: ViewRef) {
    const currentIndex = this.viewContainerRef.indexOf(viewRef);
    this.viewContainerRef.detach(currentIndex);
  }

}
