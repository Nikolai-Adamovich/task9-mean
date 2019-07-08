import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  constructor(private userService: UserService) { }

  onFormSubmit(registerForm: { value: IUser }) {
    this.userService.registerUser({
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      role: 'user',
    });
  }

}
