import { Role } from './role';

export class User{
  id: number;
  userName: string = "";
  userSurName: string = "";
  userGivenName: string = "";
  userFamilyName: string = "";
  phoneNumber: Array<string>;
  address: string = "";
  password: string;
  role: Array<string>;
  position: Array<string>;
  branchOffice: Array<string>;
  email: string;

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
}
