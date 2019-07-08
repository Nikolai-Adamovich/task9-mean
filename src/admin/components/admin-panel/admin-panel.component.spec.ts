import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from '../../admin-routing.module';
import { AppMaterialModule } from '../../../app/app-material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminPanelComponent } from './admin-panel.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { CreateArticleComponent } from '../create-article/create-article.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { ImagePickerComponent } from '../image-picker/image-picker.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminPanelComponent,
        WelcomeComponent,
        CreateArticleComponent,
        UsersListComponent,
        ImagePickerComponent,
      ],
      imports: [
        RouterModule,
        AdminRoutingModule,
        AppMaterialModule,
        FormsModule,
        BrowserAnimationsModule,
        CKEditorModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
