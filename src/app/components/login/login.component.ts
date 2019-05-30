import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  onFormSubmit(loginForm: { value: IUser }) {
    this.userService.login({
      username: loginForm.value.username,
      password: loginForm.value.password,
    });
  }

}
