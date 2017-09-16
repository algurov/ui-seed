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
//  url: string = 'http://'+ localhost + ':9999/auth-server/oauth/authorize?'
// + 'response_type=code&'
//  +'client_id=client_seed&'
// + 'state%3Dclient_id%3Dclient_seed%26goto%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fseed%26gotoOnFail%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fseed%3A8080%2Flogout&'
// +'redirect_uri=http://localhost:9998/oauth2-consumer/authorize';

url: string ='http://82.202.236.172:9999/auth-server/oauth/authorize?response_type=code&client_id=client_seed&state%3Dclient_id%3Dclient_seed%26goto%3Dhttp%3A%2F%2F82%2E202%2E236%2E172%3A3000%2Fmain%26gotoOnFail%3Dhttp%3A%2F%2F82%2E202%2E236%2E172%3A3000%2Flogin&redirect_uri=http://82.202.236.172:9998/oauth2-consumer/authorize';

  login(userLogin: string, userPassword: string): Observable<string> {
      // let data = JSON.stringify({
      //   login: userLogin,
      //   password: userPassword
      // });
      // return this.http.post(`${API_BASE_URL}/login`, data, this.options)
      // .map(res => res.text());
     return this.http.get(this.url).map(res => res.json());
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
