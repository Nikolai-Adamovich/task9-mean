import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material.module';
import { AdminModule } from '../admin/admin.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewsService } from './services/news/news.service';
import { UserService } from './services/user/user.service';
import { PopupService } from './services/popup/popup.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { ForbiddenNameDirective } from './directives/forbidden-name/forbidden-name.directive';
import { PopupComponent } from './components/popup/popup.component';
import { PopupDirective } from './directives/popup/popup.directive';
import { PopupMessageComponent } from './components/popup-message/popup-message.component';
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    ForbiddenNameDirective,
    PopupComponent,
    PopupDirective,
    PopupMessageComponent,
    LoginComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AdminModule,
    AppRoutingModule,
    NgxPaginationModule,
  ],
  providers: [
    NewsService,
    UserService,
    PopupService,
  ],
  entryComponents: [
    PopupMessageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
