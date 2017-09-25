
import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { StringService } from '../../services/string.service';
import { FlowService } from '../../services/flow.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { Contact } from '../../models/contact';
import { BranchOffice } from '../../models/branch.office';
import { FlowResponse } from '../../models/flow.response';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'user-edit',
  styleUrls: ['./user.edit.component.scss'],
  templateUrl: './user.edit.component.html'
})

export class UserEditComponent implements OnInit{
@ViewChild('submitBtn')submitBtn : ElementRef;
userForm : FormGroup;
currentUser: User;
id: number;
selectedRoles: Array<number> = new Array<number>();
roles: Array<Role> = new Array<Role>();// = [{roleName:'Администратор', id: 1}, {roleName: 'Пользователь', id: 2}];
departments: Array<string> = ['Филиал 1', 'Филиал2'];

constructor(public dlgService: DialogService, public stringService: StringService,
   public fb: FormBuilder, public flow: FlowService,
  public usrService: UserService, public route: ActivatedRoute){

    // let role = new Role();
    // role.id = 1;
    // role.roleName = 'Администратор';
    // this.roles.push(role);
    // let role1 = new Role();
    // role1.id = 2;
    // role1.roleName = 'Пользователь';
    // this.roles.push(role1);
  this.usrService.getAllRoles().subscribe(res => {
    res.forEach(item => {
      this.roles.push(new Role().deserialize(item));
    });
  });
  this.currentUser = new User();
  this.userForm = this.fb.group({
    userSurName: [''],
    userFamilyName: [''],
    userGivenName: [''],
    address: [''],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    phoneNumber: [''],
    position: [''],
    role: ['', Validators.required],
    branchOffice: ['']
  });

}
fillForm(user : User) {
   this.currentUser = user;
   this.userForm.get('userFamilyName').setValue(user.userFamilyName);
   this.userForm.get('userGivenName').setValue(user.userGivenName);
   this.userForm.get('userSurName').setValue(user.userSurName);
   this.userForm.get('address').setValue(user.getAddress());
   this.userForm.get('phoneNumber').setValue(user.getPhones());
   this.userForm.get('email').setValue(user.email);
   //TODO list set
   //this.userForm.get('branchOffice').setValue(user.branchOffice);
   this.userForm.get('position').setValue(user.getPositions());
   //this.userForm.get('role').setValue(user.role);
   user.roles.forEach(item => {
     this.selectedRoles.push(item.id);
   });


}
ngOnInit() {
  this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
       this.usrService.getUserById(this.id).subscribe(res=> {
         console.log(res);
         this.currentUser = new User().deserialize(res);
         this.fillForm(this.currentUser);
       });
      // let testUser = new User();
      // testUser.userGivenName = 'Alex';
      // testUser.userFamilyName = 'Gurov';
      // testUser.userSurName = 'Volodimirovich';
      // let address = new Contact();
      // address.contactType = 3;
      // address.address = 'Hua Hin';
      // testUser.contact.push(address);
      // let phone = new Contact();
      // phone.address = '90894432';
      // phone.contactType = 1;
      // testUser.contact.push(phone);
      // testUser.email = 'test@test';
      // testUser.branchOffice = new BranchOffice().deserialize({id: 32, fullName: 'Filial', shortName:'Fil'});
      // testUser.position.push('director');
      // let rol = new Role();
      // rol.id = 1;
      // rol.roleName = 'Admin';
      // testUser.addRole(rol);
      //
      // this.fillForm(testUser);
     }
   }
   );

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
  this.currentUser.positionList.push(item);
}

updateUserProfessions(event) {
  this.currentUser.positionList = [];
let data : Array<any> = this.userForm.get('position').value;
  data.forEach(item => this.addProfession(item.value));
  console.log(this.currentUser.positionList);
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
lookupRoles(arr: Array<number>) : Array<Role> {
    let result = new Array<Role>();
    arr.forEach(item => {
      result.push(this.roles.find(role => role.id == item));
    });
    return result;
}

submitAction() {
  if (this.userForm.valid) {
    this.currentUser.contacts = new Array<Contact>();

    this.currentUser.email = this.userForm.get('email').value;
    this.currentUser.roles = this.lookupRoles(this.userForm.get('role').value);
    this.currentUser.userGivenName = this.userForm.get('userGivenName').value;
    this.currentUser.userFamilyName = this.userForm.get('userFamilyName').value;
    this.currentUser.userSurName = this.userForm.get('userSurName').value;
    this.currentUser.positionList = this.collectDataFromChip(this.userForm.get('position').value);
    this.currentUser.branchOffice = this.userForm.get('branchOffice').value;

    let address = this.userForm.get('address').value;
    let phoneNumber = this.collectDataFromChip(this.userForm.get('phoneNumber').value);

    this.currentUser.contacts = new Array<Contact>();
    if (phoneNumber) {
      phoneNumber.forEach(item => {
        let contact : Contact = new Contact();
        contact.address = item;
        //TODO enum
        contact.contactType = 1;
        this.currentUser.contacts.push(contact);
      });
    }
    if (address) {
        let contact : Contact = new Contact();
        contact.address = address;
        //TODO enum
        contact.contactType = 3;
        this.currentUser.contacts.push(contact);
    }
    if (this.id) {
      //this.dlgService.showMessageDlg('Not implemented', 'Update action');
      this.usrService.updateUser(this.currentUser.toSend()).subscribe(res=>console.log(res));
    } else {
      this.flow.sendNewUser(new UserToSend().buildFromUser(this.currentUser));
    }
  }
}

resetPassword() {
  this.dlgService.showMessageDlg('Not implemented', 'Reset password');
}
removeUser(id) {
  this.dlgService.showConfirm('Удаление пользователя', 'Вы уверены, что хотите удалить пользователя?')
  .subscribe(res => {if (res) {
    this.usrService.deleteUserById(this.currentUser.id);}
  });

}

ngAfterContentInit() {
}

}

export class UserToSend {
  email: string;
  userGivenName: string;
  userSurName: string;
  userFamilyName: string;
  role: string;
  contact: string;
  branchOffice: string;
  position: string;

  buildFromUser(user: User) {
    this.email = user.email;
    this.userGivenName = user.userGivenName;
    this.userSurName = user.userSurName;
    this.userFamilyName = user.userFamilyName;
    this.branchOffice = user.branchOffice.id + '';
    this.position = this.stringArrayToString(user.positionList);
    this.role = this.objectArrayToIdString(user.roles);
    this.contact = this.contactArrayToString(user.contacts);
    return this;
  }

  contactArrayToString(arr: Array<Contact>): string {
    let result = '';
    if (arr) {
      arr.forEach(item => {
        result += item.toString() + ','
      });
      result = result.substring(0, result.length - 1);
      result = '{' + result + '}';
    }
    return result;
  }

  objectArrayToIdString(arr: Array<any>) : string {
      let result = '';
      if (arr) {
        arr.forEach(item => {
          result += item.id + ',';
        });
        result = result.substr(0, result.length - 1);
        return result;
      }
  }

  numberArrayToString(arr: Array<number>) : string{
    let result = '';
    if (arr) {
      arr.forEach(item => {
        result += item + ',';
      });
      result = result.substr(0, result.length - 1);
    }
    return result;
  }

  stringArrayToString(arr: Array<string>) : string{
    let result = '';
    if (arr) {
      arr.forEach(item => {
        result += item + ',';
      });
      result = result.substr(0, result.length - 1);
    }
    return result;
  }
}
