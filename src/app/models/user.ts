import { Role } from './role';

export class User{
  id: number;
  userName: string;
  userGivenName: string;
  userFamilyName: string;
  phone: string;
  password: string;
  roles: Array<string>;
  constructor() {}
}
