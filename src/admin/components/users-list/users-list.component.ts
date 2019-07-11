import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { AdminService } from '../../services/admin/admin.service';
import { UserService } from '../../../app/services/user/user.service';
import { IUser } from '../../../app/interfaces/user.interface';
import { IConfirmDialogData } from '../../../app/interfaces/confirm-dialog-data.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public usersList: IUser[];

  constructor(private adminService: AdminService, private matDialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.adminService.getUsers().subscribe((usersList: IUser[]) => {
      this.usersList = usersList;
    });
  }

  onDeleteButtonClick(user: IUser) {
    const data: IConfirmDialogData = {
      title: 'Confirm user deletion',
      content: `Are you sure you want to delete user «${user.username}»?`,
      confirmButtonText: 'Delete',
      rejectButtonText: 'Cancel',
    };
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      maxWidth: '25rem',
      width: 'calc(100% - 2.5rem)',
      data,
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUserById(user._id).then(() => {
          this.adminService.getUsers().subscribe((usersList: IUser[]) => {
            this.usersList = usersList;
          });
        });
      }
    });
  }

  onEditButtonClick(user: IUser) {
    const userData = {...user};
    const dialogRef = this.matDialog.open(EditUserDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      maxWidth: '25rem',
      width: 'calc(100% - 2.5rem)',
      data: userData
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.updateUser(userData).then(() => {
          this.adminService.getUsers().subscribe((usersList: IUser[]) => {
            this.usersList = usersList;
          });
        });
      }
    });
  }

}
