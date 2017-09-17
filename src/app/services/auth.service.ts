import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AUTH_SERVER_URL, AUTH_CONSUMER_URL } from './constants';
@Injectable()
export class AuthService extends RequestBase {
  constructor(public http: Http, public router : Router, public oauthService : OAuthService) {
    super(http);
  }
//  url: string = 'http://'+ localhost + ':9999/auth-server/oauth/authorize?'
// + 'response_type=code&'
//  +'client_id=client_seed&'
// + 'state%3Dclient_id%3Dclient_seed%26goto%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fseed%26gotoOnFail%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fseed%3A8080%2Flogout&'
// +'redirect_uri=http://localhost:9998/oauth2-consumer/authorize';

url: string ='http://82.202.236.172:9999/auth-server/oauth/authorize?response_type=code&client_id=client_seed&state=client_id%3Dclient_seed%26goto%3Dhttp%253A%252F%252F82.202.236.172%253A3000%252Fmain%26gotoOnFail%3Dhttp%253A%252F%252F82.202.236.172%253A3000%252Flogin&redirect_uri=http://82.202.236.172:9998/oauth2-consumer/authorize';

  prepareAuthLink(): string {
    let result = AUTH_SERVER_URL + '?response_type=code&client_id=client_seed&state=';
    let goto = encodeURIComponent(API_BASE_URL + '/main');
    console.log('goto    ' + goto);
    let gotoOnFail = encodeURIComponent(API_BASE_URL + '/login');
    console.log('gotoOnFail    ' + gotoOnFail);
    let state = encodeURIComponent('client_id=client_seed&goto=' + goto + '&gotoOnFail=' + gotoOnFail);
    console.log('state    ' + state);
    result = result + state + '&redirect_uri=' + AUTH_CONSUMER_URL;
    console.log(result);
    return result;
  }
  login(userLogin: string, userPassword: string): void {
      this.oauthService.loginUrl = this.prepareAuthLink();
      this.oauthService.initImplicitFlow();
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
