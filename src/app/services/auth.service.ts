import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './request.base';
import { Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { API_BASE_URL, AUTH_SERVER_URL, AUTH_CONSUMER_URL } from './constants';

@Injectable()
export class AuthService extends RequestBase {
  constructor(public http: Http, public router : Router, public oauthService : OAuthService) {
    super(http);
  }

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
