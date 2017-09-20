import { Role } from './role';

export class User{
  id: number;
  userName: string = "";
  userGivenName: string = "";
  userFamilyName: string = "";
  phones: Array<string>;
  password: string;
  roles: Array<Role>;
  professions: Array<string>;
  email: string;

  public getShortName() : string {
    let result = '';
    if (this.userFamilyName) {
      result = result + this.userFamilyName + ' ';
    }
    if (this.userName) {
      result = result + this.userName[0] +'. ';
    }
    if (this.userGivenName) {
      result = result + this.userGivenName[0] + '.';
    }
    return result;
  }
}
