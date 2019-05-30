import { Component } from '@angular/core';

@Component({
  selector: 'app-add-url-dialog',
  templateUrl: './add-url-dialog.component.html',
  styleUrls: ['./add-url-dialog.component.scss']
})
export class AddUrlDialogComponent {
  private urlRe = /^(http(s){0,1}:\/\/){0,1}[a-zA-Z0-9]+\.[a-zA-Z0-9]+/i;

  constructor() { }

}
