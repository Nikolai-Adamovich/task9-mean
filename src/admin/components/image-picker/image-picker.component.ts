import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToolsService } from '../../../app/services/tools/tools.service';
import { AddUrlDialogComponent } from '../add-url-dialog/add-url-dialog.component';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePickerComponent {
  public buttonToggleGroupValue: string;
  public currentButton: string;

  constructor(private form: NgForm, private matDialog: MatDialog, private toolsService: ToolsService, private ref: ChangeDetectorRef) { }

  async onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    if (file) {
      const base64Url = await this.toolsService.getBase64(file);
      this.form.controls.imgUrl.setValue(base64Url);
      this.buttonToggleGroupValue = this.currentButton = 'byImage';
    } else {
      this.buttonToggleGroupValue = this.currentButton;
    }

    this.ref.markForCheck();
  }

  onExternalUrlClick() {
    const dialogRef = this.matDialog.open(AddUrlDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      maxWidth: '25rem',
      width: 'calc(100% - 2.5rem)',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.form.controls.imgUrl.setValue(res);
        this.buttonToggleGroupValue = this.currentButton = 'byUrl';
      } else {
        this.buttonToggleGroupValue = this.currentButton;
      }

      this.ref.markForCheck();
    });
  }

  onClearButtonClick(file: NgModel) {
    this.form.controls.imgUrl.reset();
    this.form.controls.imgUrl.markAsTouched();
    file.control.reset();
    this.buttonToggleGroupValue = '';
    this.currentButton = '';
  }

}
