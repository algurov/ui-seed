import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
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
    // let goto = encodeURIComponent(API_BASE_URL + '/main');
    // console.log('goto    ' + goto);
    // let gotoOnFail = encodeURIComponent(API_BASE_URL + '/login');
    // console.log('gotoOnFail    ' + gotoOnFail);
    // let state = encodeURIComponent('client_id=client_seed&goto=' + goto + '&gotoOnFail=' + gotoOnFail);
    // console.log('state    ' + state);
    // result = result + state + '&redirect_uri=' + AUTH_CONSUMER_URL;
    // console.log(result);
    return result;
  }

  login(): void {


      this.http.get(API_BASE_URL +'/login-main').subscribe(res=>window.location.href = res.text());
      //window.location.href = this.prepareAuthLink();
  }

  logout(): void {
    window.document.cookie = '';

  }
}
