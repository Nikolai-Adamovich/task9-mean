import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app/app-material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { AdminService } from './services/admin/admin.service';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConfirmDialogComponent } from '../app/components/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersListComponent,
    CreateArticleComponent,
    WelcomeComponent,
    EditUserDialogComponent,
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
    EditUserDialogComponent,
  ],
  providers: [
    AdminService,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditUserDialogComponent,
  ],
})
export class AdminModule { }
