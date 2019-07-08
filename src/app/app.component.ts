import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { routerTransition } from './animations/router.animations';
import { IUser } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentUser: IUser | undefined;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((data: IUser | undefined) => {
      this.currentUser = data;
    });

    this.userService.getCurrentUser();
  }
}
