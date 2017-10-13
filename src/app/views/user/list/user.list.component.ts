
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../../services/dialog.service';
import { MainService } from '../../../services/main.service';
import { UserService } from '../../../services/user.service';
import { StringService } from '../../../services/string.service';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { FlowService } from '../../../services/flow.service';
import { User } from '../../../models/user';
import { FlowResponse } from '../../../models/flow.response';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'user-list',
  styleUrls: ['./user.list.component.scss'],
  templateUrl: './user.list.component.html'
})

export class UserListComponent {
  //displayedColumns = ['id', 'userFamilyName', 'userGivenName', 'email'];
  displayedColumns = [{column: 'id', title: 'ID'}, {column: 'userFamilyName', title: 'USER_FAMILY_NAME'},
                      {column: 'userGivenName', title: 'USER_GIVEN_NAME'}, {column:'email', title:'USER_EMAIL'}];
  users: Array<User> = new Array<User>();
  dataSource: ExampleDataSource;
  constructor( public router: Router,
    public dlgService: DialogService,
    public main : MainService,
    public stringService: StringService,
    public flow: FlowService,
    public userService : UserService) {
      this.flow.lastFlowResponse = null;
      this.userService.getAllUsers().subscribe(res=> {
        res.forEach(item => {
          this.users.push(new User().deserialize(item))
        });
      });
      this.dataSource = new ExampleDataSource(this.userService);
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

export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  data: Observable<any>;
  constructor(private userService: UserService) {
    super();
  }

  connect(): Observable<User[]> {
    //return this.data;
    return this.userService.getAllUsers();
  }

  disconnect() {}
}
