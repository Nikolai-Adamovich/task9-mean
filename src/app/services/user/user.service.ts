import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PopupService } from '../../services/popup/popup.service';
import { PopupMessageComponent } from '../../components/popup-message/popup-message.component';
import { IUser } from '../../interfaces/user.interface';
import { ICustomError } from '../../interfaces/custom-error.interface';
import { IMongoError } from '../../interfaces/mongo-error.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: BehaviorSubject<IUser | undefined> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private router: Router, private popupService: PopupService) { }

  private onHttpErrorResponse(httpErrorResponse: HttpErrorResponse): void {
    let errorMessages: string[] = [];

    if (httpErrorResponse.error instanceof Error) {
      const error: Error = httpErrorResponse.error;
      if (error.message) {
        errorMessages.push(error.message);
      } else {
        errorMessages.push('Unknown error');
      }
    } else {
      switch (httpErrorResponse.error.name) {
        case 'CustomError':
          const customError: ICustomError = httpErrorResponse.error as unknown as ICustomError;
          errorMessages = (customError.errorMessages || []).slice();
          break;
        case 'MongoError':
          const mongoError: IMongoError = httpErrorResponse.error as unknown as IMongoError;
          errorMessages.push(mongoError.errmsg);
          break;
        default:
          const error: Error = httpErrorResponse.error;
          if (error.message) {
            errorMessages.push(error.message);
          } else {
            errorMessages.push('Unknown error');
          }
      }
    }

    errorMessages.forEach(message => {
      this.popupService.open(PopupMessageComponent, {
        type: 'error',
        closeTimeout: 5,
        message,
      });
    });
  }

  getCurrentUser(): void {
    this.http.get('/user').subscribe((data: IUser) => {
      this.currentUser.next(data);
    });
  }

  registerUser(user: IUser): void {
    this.http.post('/user', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((registeredUser: IUser) => {
      this.popupService.open(PopupMessageComponent, {
        type: 'success',
        closeTimeout: 5,
        message: `User «${registeredUser.username}» has been successfully registered`,
      });
      this.router.navigate(['login']);
    }, (httpErrorResponse: HttpErrorResponse) => {
      this.onHttpErrorResponse(httpErrorResponse);
    });
  }

  deleteUserById(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(`/user/${userId}`).subscribe((deletedUser: IUser) => {
        this.popupService.open(PopupMessageComponent, {
          type: 'success',
          closeTimeout: 5,
          message: `User «${deletedUser.username}» has been successfully deleted`,
        });
        resolve();
      }, (httpErrorResponse: HttpErrorResponse) => {
          this.onHttpErrorResponse(httpErrorResponse);
          reject();
      });
    });
  }

  updateUser(user: IUser): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.put(`/user`, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe((updatedUser: IUser) => {
        this.popupService.open(PopupMessageComponent, {
          type: 'success',
          closeTimeout: 5,
          message: `User «${updatedUser.username}» has been successfully updated`,
        });
        resolve();
      }, (httpErrorResponse: HttpErrorResponse) => {
          this.onHttpErrorResponse(httpErrorResponse);
          reject();
      });
    });
  }

  login(user: IUser): void {
    this.http.post('/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((data: IUser) => {
      this.currentUser.next(data);
      this.popupService.open(PopupMessageComponent, {
        type: 'success',
        closeTimeout: 5,
        message: `Hello «${data.username}»`,
      });
      this.router.navigate(['/']);
    }, (httpErrorResponse: HttpErrorResponse) => {
      this.onHttpErrorResponse(httpErrorResponse);
    });
  }

  logout(): void {
    this.http.get('/logout').subscribe(() => {
      this.currentUser.next(undefined);
      this.popupService.open(PopupMessageComponent, {
        closeTimeout: 5,
        message: 'You have logged out',
      });
      this.router.navigate(['/']);
    });
  }

}
