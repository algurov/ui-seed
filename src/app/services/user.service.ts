import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import * as bcryptjs from 'bcryptjs';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  login(userLogin: string, userPassword: string): Observable<string> {
      let data = JSON.stringify({
        login: userLogin,
        password: userPassword
      });
      return this.http.post(`${API_BASE_URL}/login`, data, this.options)
      .map(res => res.text());
  }

  logout(userLogin: string): Observable<string> {
    let data = JSON.stringify({
      login: userLogin
    });
    return this.http.post(`${API_BASE_URL}/logout`, data, this.options)
      .map(res => res.text());
  }

  setPassword(user, password): Observable<string> {
    var hash = bcryptjs.hashSync(user.password, 8);
    console.log(hash);
    return this.http.post(`${API_BASE_URL}/setpassword`, this.options)
    .map(res => res.text());
  }

  registration(user): Observable<string> {
      return this.http.post(`${API_BASE_URL}/user-provisioning/user`,
         JSON.stringify(user), this.options)
      .map(res => res.json());
  }

  getUserById(id): Observable<User>{
    return this.http.get(`${API_BASE_URL}/user-provisioning/user/` + id)
    .map(res => res.json());
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get(`${API_BASE_URL}/user-provisioning/user`)
    .map(res => res.json());
  }

  getRoleById(id): Observable<Role> {
    return this.http.get(`${API_BASE_URL}/user-provisioning/role` + id).map(res => res.json());
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get(`${API_BASE_URL}/user-provisioning/role`).map(res => res.json());
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post(`${API_BASE_URL}/user-provisioning/role`, JSON.stringify(role), this.options)
    .map(res => res.json());
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`${API_BASE_URL}/user-provisioning/user`, JSON.stringify(user), this.options)
    .map(res => res.json());
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(`${API_BASE_URL}/user-provisioning/user/`+ user.id, JSON.stringify(user), this.options)
    .map(res => res.json());
  }

  updateRole(role: Role) {
    return this.http.put(`${API_BASE_URL}/user-provisioning/role/`+ role.id, JSON.stringify(role), this.options)
    .map(res => res.json());
  }

  deleteRoleById(id) {
    this.http.delete(`${API_BASE_URL}/user-provisioning/role/` + id);
  }

  deleteRole(role: Role) {
    if (role.id) {
      this.deleteRoleById(role.id);
    }
  }

  deleteUserById(id) {
    this.http.delete(`${API_BASE_URL}/user-provisioning/user/` + id);
  }

  deleteUser(user: User) {
    if (user.id) {
      this.deleteRoleById(user.id);
    }
  }

}