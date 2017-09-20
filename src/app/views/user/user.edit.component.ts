
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { StringService } from '../../services/string.service';
import { FlowService } from '../../services/flow.service';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { FlowResponse } from '../../models/flow.response';

@Component({
  selector: 'user-edit',
  styleUrls: ['./user.edit.component.scss'],
  templateUrl: './user.edit.component.html'
})

export class UserEditComponent {
userForm : FormGroup;
currentUser: User;
roles: Array<string> = ['Администратор', 'Пользователь'];
departments: Array<string> = ['Филиал 1', 'Филиал2'];
constructor(public dlgService: DialogService, public stringService: StringService, public fb: FormBuilder, public flow: FlowService){
  this.currentUser = new User();
  this.userForm = this.fb.group({
    userName: [''],
    userFamilyName: [''],
    userGivenName: [''],
    userAdress: [''],
    email: [''],
    telephone: [''],
    professions: ['']
  });
}

updateUserFamilyName(event) {
  this.currentUser.userFamilyName = event;
}

updateUserName(event) {
  this.currentUser.userName = event;
}

updateUserGivenName(event) {
  this.currentUser.userGivenName = event;
}

addProfession(item) {
  this.currentUser.professions.push(item);
}
updateUserProfessions(event) {
  this.currentUser.professions = [];
let data : Array<any> = this.userForm.get('professions').value;
  data.forEach(item => this.addProfession(item.value));
  console.log(this.currentUser.professions);
}

saveUser() {
  this.submitAction();
}

submitAction() {
  if (this.userForm.valid) {
    this.currentUser.email = this.userForm.get('email').value;
    this.currentUser.roles = [new Role('Admin')];
    this.flow.sendNewUser(this.currentUser);
  }
}

ngAfterContentInit() {

}

}
