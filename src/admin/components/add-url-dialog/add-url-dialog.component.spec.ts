import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../../../app/app-material.module';
import { AddUrlDialogComponent } from './add-url-dialog.component';

describe('AddUrlDialogComponent', () => {
  let component: AddUrlDialogComponent;
  let fixture: ComponentFixture<AddUrlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddUrlDialogComponent,
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
