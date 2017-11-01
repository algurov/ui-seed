import { User } from './user';
import { Serializable } from './serializable';

export class Role implements Serializable<Role>{
  roleName: string;
  id: number;
  users: User[];

  constructor() {}
  
  deserialize(input) {
    let users = new Array<User>();

    this.id = input.id;
    this.roleName = input.roleName;
    if (input.users) {
      input.users.forEach(item => {
        let user = new User().deserialize(item);
        this.users.push(user);
      });
    }
    return this;
  }
}
