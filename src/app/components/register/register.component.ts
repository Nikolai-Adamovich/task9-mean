import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private userService: UserService) { }

  user: IUser = {
    username: ''
  };

  onFormSubmit() {
    this.userService.registerUser({
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      role: 'user',
    });
  }

}
