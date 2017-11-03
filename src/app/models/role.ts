import { User } from './user';
import { Serializable } from './serializable';

export class Role implements Serializable<Role>{
  roleName: string;
  id: number;
  users: User[];
  version: number;

  constructor() {}

  deserialize(input) {
    let users = new Array<User>();

    this.id = input.id;
    this.roleName = input.roleName;
    this.version = input.version;
    if (input.users) {
      input.users.forEach(item => {
        let user = new User().deserialize(item);
        this.users.push(user);
      });
    }
    return this;
  }
}
