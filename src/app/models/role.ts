import { User } from './user';

export class Role {
  roleName: string;
  id: number;
  users: User[];
}
