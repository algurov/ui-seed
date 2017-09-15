import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';

@Injectable()
export class AuthService extends RequestBase {
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

//TODO
  logout(): Observable<string> {
    let data = JSON.stringify({
      login: 'logged in user'
    });
    return this.http.post(`${API_BASE_URL}/logout`, data, this.options)
      .map(res => res.text());
  }
}
