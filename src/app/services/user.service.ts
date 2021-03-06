import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { API_BASE_URL, PROVISIONING_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import * as bcryptjs from 'bcryptjs';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: Http, public router : Router) {
    super(http);
  }

  login(userLogin: string, userPassword: string): Observable<string> {
      let data = JSON.stringify({
        login: userLogin,
        password: userPassword
      });
      return this.http.post(`${API_BASE_URL}/login`, data, this.getOptions(this.OPT.AUTH_JSON))
      .map(res => res.text());
  }

  logout(userLogin: string): Observable<string> {
    let data = JSON.stringify({
      login: userLogin
    });
    return this.http.post(`${API_BASE_URL}/logout`, data, this.getOptions(this.OPT.AUTH_JSON))
      .map(res => res.text());
  }

  setPassword(user, password): Observable<string> {
    var hash = bcryptjs.hashSync(user.password, 8);
    console.log(hash);
    return this.http.post(`${API_BASE_URL}/setpassword`, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.text());
  }

  registration(user): Observable<string> {
      return this.http.post(`${API_BASE_URL}/user-provisioning/user`,
         JSON.stringify(user), this.getOptions(this.OPT.AUTH_JSON))
      .map(res => res.json());
  }

  getUserById(id): Observable<User>{
    return this.http.get(`${PROVISIONING_BASE_URL}/user-provisioning/user/` + id)
    .map(res => res.json());
  }

  getUserByIdFull(id): Observable<User>{
    return this.http.get(`${PROVISIONING_BASE_URL}/user-provisioning/user/` + id +'/full')
    .map(res => res.json());
  }

  getAllUsers(page, size): Observable<User[]>{
  //  return this.http.get(`${PROVISIONING_BASE_URL}/user-provisioning/user`).map(res => res.json());
    let url = `${PROVISIONING_BASE_URL}/user-provisioning/user`;
    if (page != null && size != null) {
      url += '?page=' + page + '&size=' + size;
    }
    return this.http.get(url, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`${API_BASE_URL}/user-provisioning/user`, JSON.stringify(user), this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  updateUser(user): Observable<User> {
    console.log(user);
    return this.http.put(`${PROVISIONING_BASE_URL}/user-provisioning/user`, JSON.stringify(user), this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  deleteUserById(id) {
    this.http.delete(`${PROVISIONING_BASE_URL}/user-provisioning/user/` + id).subscribe(res => {console.log(res);
      this.router.navigateByUrl('/main/user');
    });
  }

  deleteUser(user: User) {
    if (user.id) {
      this.deleteUserById(user.id);
    }
  }

}
