import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app/app-material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminService } from './services/admin/admin.service';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { AddUrlDialogComponent } from './components/add-url-dialog/add-url-dialog.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersListComponent,
    CreateArticleComponent,
    WelcomeComponent,
    ConfirmDialogComponent,
    EditUserDialogComponent,
    ImagePickerComponent,
    AddUrlDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    AdminRoutingModule,
    CKEditorModule,
  ],
  exports: [
    AdminPanelComponent,
    UsersListComponent,
    CreateArticleComponent,
    WelcomeComponent,
    ConfirmDialogComponent,
    EditUserDialogComponent,
    ImagePickerComponent,
    AddUrlDialogComponent,
  ],
  providers: [
    AdminService,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditUserDialogComponent,
    AddUrlDialogComponent,
  ],
})
export class AdminModule { }
