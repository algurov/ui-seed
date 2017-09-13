import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';

@Injectable()
export class UserService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  login(): Observable<string> {
      return this.http.get(`${API_BASE_URL}/login`, this.optionsNoPre)
      .map(res => res.text());
  }

  logout(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/logout`, this.optionsNoPre)
      .map(res => res.text());
  }
}
