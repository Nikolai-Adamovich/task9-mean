import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() currentUser: IUser | undefined ;

  constructor(public userService: UserService) { }

}
