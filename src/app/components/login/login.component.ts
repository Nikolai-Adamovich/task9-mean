import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private user: IUser = {};

  constructor(private userService: UserService) { }

  /* onFormSubmit(loginForm: { value: { username: string; password: string; }; }) {
    this.userService.login({
      username: loginForm.value.username,
      password: loginForm.value.password,
    });
  } */

  onFormSubmit() {
    this.userService.login({
      username: this.user.username,
      password: this.user.password,
    });
  }

}
