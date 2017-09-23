
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { StringService } from '../../services/string.service';
import { FlowService } from '../../services/flow.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { FlowResponse } from '../../models/flow.response';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'user-edit',
  styleUrls: ['./user.edit.component.scss'],
  templateUrl: './user.edit.component.html'
})

export class UserEditComponent {
@ViewChild('submitBtn')submitBtn : ElementRef;
userForm : FormGroup;
currentUser: User;
roles: Array<any>;// = [{roleName:'Администратор', id: 1}, {roleName: 'Пользователь', id: 2}];
rol: Array<Role>;
departments: Array<string> = ['Филиал 1', 'Филиал2'];
constructor(public dlgService: DialogService, public stringService: StringService,
   public fb: FormBuilder, public flow: FlowService,
  public usrService: UserService){
  this.usrService.getAllRoles().subscribe(res => {
    this.roles = res;
    console.log(this.roles);
  });
  this.currentUser = new User();
  this.userForm = this.fb.group({
    userSurName: [''],
    userFamilyName: [''],
    userGivenName: [''],
    address: [''],
    email: ['', Validators.email],
    phoneNumber: [''],
    position: [''],
    role: ['', Validators.required],
    branchOffice: ['']
  });

}

updateUserFamilyName(event) {
  this.currentUser.userFamilyName = event;
}

updateUserName(event) {
  this.currentUser.userGivenName = event;
}

updateUserGivenName(event) {
  this.currentUser.userSurName = event;
}

addProfession(item) {
  this.currentUser.position.push(item);
}
updateUserProfessions(event) {
  this.currentUser.position = [];
let data : Array<any> = this.userForm.get('position').value;
  data.forEach(item => this.addProfession(item.value));
  console.log(this.currentUser.position);
}

submitForm() {
  this.submitBtn.nativeElement.click();
}

collectDataFromChipContact(data: Array<any>) : Array<any> {
  if (data) {
    let result = new Array<any>();
    data.forEach(item => {
      result.push({1: item.value});
    });
  return result;
} else {
  return null;
}
}

collectDataFromChip(data: Array<any>) : Array<string> {
  if (data) {
    let result = new Array<string>();
    data.forEach(item => {
      result.push(item.value);
    });
  return result;
} else {
  return null;
}
}

collectDataFromRoleSelect(data : Array<any>) : Array<string>{
  if (data) {
    let result = new Array<string>();
    data.forEach(item => {
      result.push(item.id + '');
    });
    return result;
  } else {
    return null;
  }
}

submitAction() {
  //if (this.userForm.valid) {
    this.currentUser.email = this.userForm.get('email').value;
    this.currentUser.role = this.collectDataFromRoleSelect(this.userForm.get('role').value);
    this.currentUser.userGivenName = this.userForm.get('userGivenName').value;
    this.currentUser.userFamilyName = this.userForm.get('userFamilyName').value;
    this.currentUser.userSurName = this.userForm.get('userSurName').value;
    this.currentUser.address = this.userForm.get('address').value;
    this.currentUser.phoneNumber = this.collectDataFromChipContact(this.userForm.get('phoneNumber').value);
    this.currentUser.position = this.collectDataFromChip(this.userForm.get('position').value);
    this.currentUser.branchOffice = this.userForm.get('branchOffice').value;
    this.currentUser.contact = this.currentUser.phoneNumber;
    this.currentUser.contact.push({3 : this.currentUser.address});
    this.flow.sendNewUser(this.currentUser);
//  }
}

ngAfterContentInit() {

}

}
