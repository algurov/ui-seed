import { Role } from './role';
import { Serializable } from './serializable';
import { Contact } from './contact';
import { BranchOffice } from './branch.office';

export class User implements Serializable<User>{
  id: number;
  userName: string = "";
  userSecondName: string = "";
  userGivenName: string = "";
  userFamilyName: string = "";
  password: string;
  roles: Array<Role> = new Array<Role>();
  positions: Array<any> = new Array<any>();
  branchOffice: BranchOffice;
  contacts: Array<Contact> = new Array<Contact>();
  email: string;

  toSend() {
    return {
      id: this.id,
      userName: this.userName,
      userGivenName: this.userGivenName,
      userFamilyName: this.userFamilyName,
      userSecondName: this.userSecondName,
      email: this.email,
      roles : this.roles,
      contacts: this.contacts,
      positions: this.positions,
      branchOffice: null

    };
  }

  public getUserProfessionName() : string {
    let result = '';
    if (this.positions) {
      this.positions.forEach(item => {
        result += item.name + ', ';
      });
      result = result.substring(0, result.length - 2);
    }
    return result;
  }
  public getShortName() : string {
    let result = '';
    if (this.userFamilyName) {
      result = result + this.userFamilyName + ' ';
    }
    if (this.userGivenName) {
      result = result + this.userGivenName[0] +'. ';
    }
    if (this.userSecondName) {
      result = result + this.userSecondName[0] + '.';
    }
    return result;
  }

  addRole(role : Role) {
    this.roles.push(role);
  //  this.roleId.push(role.id);
  }

  getRolesId() : Array<number> {
    let result = [];
    if (this.roles) {
      this.roles.forEach(item => {
        result.push(item.id);
      });
    }
    return result;
  }

  getAddress(): string {
    let result = '';
    if (this.contacts) {
      this.contacts.forEach(item => {
        if (item.contactType == 'ADDRESS') {
          result = item.address;
        }
      });
    }
    return result;
  }

  getPositions() : any {
    let result = [];
    if (this.positions) {
      this.positions.forEach(item => {
        result.push({display: item.name, value: item.name});
      });
    }
    return result;
  }

  getPhones(): any {
    let result = [];
    if (this.contacts) {
      this.contacts.forEach(item => {
        if (item.contactType == 'MOBILE_PHONE') {
          result.push({display: item.address, value: item.address});
        }
      });
    }
    return result;
  }

  deserialize(input) {
    this.id = input.id;
    //this.address = input.address;
    if (input.branchOffice) {
      this.branchOffice = new BranchOffice().deserialize(input.branchOffice);
    }
    this.email = input.email;

    this.positions = input.positions;
    if (input.roles) {
      input.roles.forEach(item => {
        this.roles.push(new Role().deserialize(item));
        //this.roleId.push(+item.id);
      })
    }
    if (input.contacts) {
      input.contacts.forEach(item => {
        this.contacts.push(new Contact().deserialize(item));
      });
    }
    this.userFamilyName = input.userFamilyName;
    this.userName = input.userName;
    this.userGivenName = input.userGivenName;
    this.userSecondName = input.userSecondName;
    return this;
  }
}
