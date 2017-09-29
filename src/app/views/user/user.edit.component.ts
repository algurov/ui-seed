
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

  this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
       this.usrService.getUserByIdFull(this.id).subscribe(res=> {
         console.log(res);
         this.currentUser = new User().deserialize(res);
         //this.fillForm(this.currentUser);
         this.usrService.getAllRoles().subscribe(res => {
           res.forEach(item => {
             this.roles.push(new Role().deserialize(item));
             this.fillForm(this.currentUser);
           });
         });
       });
     } else {
       this.usrService.getAllRoles().subscribe(res => {
         res.forEach(item => {
           this.roles.push(new Role().deserialize(item));
         });
       });
     }
   }
   );
  this.currentUser = new User();
  this.userForm = this.fb.group({
    userSecondName: [''],
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
   this.userForm.get('userSecondName').setValue(user.userSecondName);
   this.userForm.get('address').setValue(user.getAddress());
   this.userForm.get('phoneNumber').setValue(user.getPhones());
   this.userForm.get('email').setValue(user.email);
   //TODO branchOffice fillForm
   //this.userForm.get('branchOffice').setValue(user.branchOffice);
   this.userForm.get('position').setValue(user.getPositions());
   //this.userForm.get('role').setValue(user.roles);
   user.roles.forEach(item => {
     this.selectedRoles.push(item.id);
   });


}
ngAfterViewChecked() {

}
ngOnInit() {


}

updateUserFamilyName(event) {
  this.currentUser.userFamilyName = event;
}

updateUserName(event) {
  this.currentUser.userGivenName = event;
}

updateUserGivenName(event) {
  this.currentUser.userSecondName = event;
}

addProfession(item) {
  this.currentUser.positions.push(item);
}

updateUserProfessions(event) {
  this.currentUser.positions = [];
let data : Array<any> = this.userForm.get('position').value;
  data.forEach(item => this.addProfession({ name:item.value }));
  console.log(this.currentUser.positions);
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

collectPositionsDataFromChip(data: Array<any>) : Array<any> {
  if (data) {
    let result = new Array<any>();
    data.forEach(item => {
      result.push({name :item.value});
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
    this.currentUser.userSecondName = this.userForm.get('userSecondName').value;
    this.currentUser.positions = this.collectPositionsDataFromChip(this.userForm.get('position').value);
    this.currentUser.branchOffice = this.userForm.get('branchOffice').value;

    let address = this.userForm.get('address').value;
    let phoneNumber = this.collectDataFromChip(this.userForm.get('phoneNumber').value);

    this.currentUser.contacts = new Array<Contact>();
    if (phoneNumber) {
      phoneNumber.forEach(item => {
        let contact : Contact = new Contact();
        contact.address = item;
        //TODO enum
        contact.contactType = 'MOBILE_PHONE';
        this.currentUser.contacts.push(contact);
      });
    }
    if (address) {
        let contact : Contact = new Contact();
        contact.address = address;
        //TODO enum
        contact.contactType = 'ADDRESS';
        this.currentUser.contacts.push(contact);
    }
    if (this.id) {
      //this.dlgService.showMessageDlg('Not implemented', 'Update action');
      this.dlgService.block = true;
      this.usrService.updateUser(this.currentUser.toSend()).subscribe(res=>{this.dlgService.block = false; this.dlgService.showNotification('Пользователь обновлен')});
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

}

export class UserToSend {
  email: string;
  userGivenName: string;
  userSecondName: string;
  userFamilyName: string;
  roles: string;
  contact: string;
  branchOffice: string;
  positions: string;

  buildFromUser(user: User) {
    this.email = user.email;
    this.userGivenName = user.userGivenName;
    this.userSecondName = user.userSecondName;
    this.userFamilyName = user.userFamilyName;
    this.branchOffice = user.branchOffice.id + '';
    this.positions = this.objectArrayToNameString(user.positions);
    this.roles = this.objectArrayToIdString('roles',user.roles);
    this.contact = this.contactArrayToString(user.contacts);
    return this;
  }

  contactArrayToString(arr: Array<Contact>): string {
    let result = '';
    let mobilePhones = new Array<String>();
    let address = '';
    if (arr) {
      arr.forEach(item => {
        if (item.contactType == 'MOBILE_PHONE') {
          mobilePhones.push(item.address);
        }
        if (item.contactType == "ADDRESS") {
          address = item.address;
        }
        // result += item.toString() + ','
      });
      let obj = {
        MOBILE_PHONE: mobilePhones,
        ADDRESS: address
      };
      result = JSON.stringify(obj);
    //  result = result.substring(0, result.length - 1);
      // result = '{' + result + '}';
    }
    return result;
  }

  objectArrayToNameString(arr: Array<any>) : string {
      let result = '';
      let resArr = new Array<string>();
      if (arr) {
        arr.forEach(item => {
          resArr.push(item.name);
          //result += item.name + ',';
        });
        result = JSON.stringify({positions: resArr});
        //result = result.substr(0, result.length - 1);
        return result;
      }
  }

  objectArrayToIdString(title: string, arr: Array<any>) : string {
      let result = '';
      let resArr = new Array<number>();
      if (arr) {
        arr.forEach(item => {
          resArr.push(item.id);
          //result += item.id + ',';
        });
        //result = result.substr(0, result.length - 1);
        //result = '{' + title +':[' + result  + ']}';
        result = JSON.stringify({roles : resArr });
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
