import { Role } from './role';
import { Serializable } from './serializable';
import { Contact } from './contact';
import { BranchOffice } from './branch.office';

export class User implements Serializable<User>{
  id: number;
  userName: string = "";
  userSurName: string = "";
  userGivenName: string = "";
  userFamilyName: string = "";
  password: string;
  roles: Array<Role> = new Array<Role>();
  roleId : Array<number> = new Array<number>();
  position: Array<string> = new Array<string>();
  branchOffice: BranchOffice;
  contact: Array<Contact> = new Array<Contact>();
  email: string;

  toSend() {
    return {
      id: this.id,
      userName: this.userName,
      userGivenName: this.userGivenName,
      userFamilyName: this.userFamilyName,
      userSurName: this.userSurName
    }
  }
  public getShortName() : string {
    let result = '';
    if (this.userFamilyName) {
      result = result + this.userFamilyName + ' ';
    }
    if (this.userGivenName) {
      result = result + this.userGivenName[0] +'. ';
    }
    if (this.userSurName) {
      result = result + this.userSurName[0] + '.';
    }
    return result;
  }

  addRole(role : Role) {
    this.roles.push(role);
    this.roleId.push(role.id);
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
    if (this.contact) {
      this.contact.forEach(item => {
        if (item.contactType == 3) {
          return item.address;
        }
      });
    }
    return '';
  }

  getPositions() : any {
    let result = [];
    if (this.position) {
      this.position.forEach(item => {
        result.push({display: item, value: item});
      });
    }
    return result;
  }

  getPhones(): any {
    let result = [];
    if (this.contact) {
      this.contact.forEach(item => {
        if (item.contactType == 1) {
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
    this.position = input.position;
    if (input.role) {
      input.role.forEach(item => {
        this.roles.push(new Role().deserialize(item));
        this.roleId.push(+item.id);
      })
    }
    if (input.contact) {
      input.contact.forEach(item => {
        this.contact.push(new Contact().deserialize(item));
      });
    }
    this.userFamilyName = input.userFamilyName;
    this.userName = input.userName;
    this.userGivenName = input.userGivenName;
    this.userSurName = input.userSurName;
    return this;
  }
}
