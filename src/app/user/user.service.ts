import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';
import * as bcryptjs from 'bcryptjs';
import { User } from '../models/user';

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  login(): Observable<string> {
      return this.http.get(`${API_BASE_URL}/login`, this.optionsNoPre)
      .map(res => res.text());
  }

  setPassword(user, password): Observable<string> {
    var hash = bcryptjs.hashSync(user.password, 8);
    console.log(hash);
    console.log(bcryptjs.compareSync(user.password, hash));
    console.log(bcryptjs.compareSync('pass', hash));
    return this.http.post(`${API_BASE_URL}/setpassword`, this.options)
    .map(res => res.text());
  }

  registration(user): Observable<string> {
     var hash = bcryptjs.hashSync(user.password, 8);
     console.log(hash);
     console.log(bcryptjs.compareSync(user.password, hash));
     console.log(bcryptjs.compareSync('pass', hash));
      return this.http.post(`${API_BASE_URL}/user-provisioning/user`, this.options)
      .map(res => res.json());
  }

  getById(idd): Observable<User[]>{
  //  this.options.body = JSON.stringify({id: idd});
    return this.http.get('http://82.202.236.172:8081/user-provisioning/user/'+idd.value, this.options)
    .map(res => res.json());
  }

  logout(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/logout`, this.optionsNoPre)
      .map(res => res.text());
  }
}
