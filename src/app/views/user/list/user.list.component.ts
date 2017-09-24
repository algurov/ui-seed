
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';
import { MainService } from '../../../services/main.service';
import { UserService } from '../../../services/user.service';
import { StringService } from '../../../services/string.service';
import { MdSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { FlowService } from '../../../services/flow.service';
import { User } from '../../../models/user';
import { FlowResponse } from '../../../models/flow.response';


@Component({
  selector: 'user-list',
  styleUrls: ['./user.list.component.scss'],
  templateUrl: './user.list.component.html'
})

export class UserListComponent {
  users: Array<User> = new Array<User>();
  constructor( public router: Router,
    public dlgService: DialogService,
    public main : MainService,
    public stringService: StringService,
    public flow: FlowService,
    public userService : UserService) {
      this.userService.getAllUsers().subscribe(res=> {
        res.forEach(item => {
          this.users.push(new User().deserialize(item))
        });
      });

      //this.users.push(new User().deserialize({id: 33, userName: 'login'}));
  }
  ngAfterInit() {

  }
  newUser() {
    this.flow.aksNewUser();
  }
  editUser(user) {
    this.router.navigate(['/main/user/edit', user.id]);
  }

}
