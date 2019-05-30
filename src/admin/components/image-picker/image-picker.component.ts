import { Component } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AddUrlDialogComponent } from '../add-url-dialog/add-url-dialog.component';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ImagePickerComponent {
  private buttonToggleGroupValue: string;
  private currentButton: string;

  constructor(private form: NgForm, private matDialog: MatDialog) { }

  async onFileChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    if (file) {
      const base64Url = await this.getBase64(file);
      this.form.controls.imgUrl.setValue(base64Url);
      this.buttonToggleGroupValue = this.currentButton = 'byImage';
    } else {
      this.buttonToggleGroupValue = this.currentButton;
    }
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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
