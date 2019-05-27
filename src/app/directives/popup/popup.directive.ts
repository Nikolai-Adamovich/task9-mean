import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPopupHost]'
})
export class PopupDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
