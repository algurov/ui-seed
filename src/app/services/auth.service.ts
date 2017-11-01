import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './request.base';
import { Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { API_BASE_URL, AUTH_SERVER_URL, AUTH_CONSUMER_URL, AUTH_SERVER_BASE_URL, SEED_BASE_URL} from './constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthService extends RequestBase {
  loggedIn = null;
  constructor(public http: Http, public router : Router, public oauthService : OAuthService) {
    super(http);
  }

  getLoggedIn() {
    if (this.loggedIn) {
      return this.loggedIn;
    } else {
      return null;
    }
  }
  login(): void {
      this.http.get(API_BASE_URL +'/api/v1/login/url').subscribe(res=>window.location.href = res.text());
  }

  loginRedirect(): void {
      this.http.get(API_BASE_URL +'/api/v1/login/redirect').subscribe(res=>window.location.href = res.text());
  }

  logout() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic Y2xpZW50X3NlZWQ6c2VjcmV0');
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    let at = Cookie.get('at');
    Cookie.deleteAll();
     return this.http.post(AUTH_SERVER_BASE_URL +'/auth-server/oauth/token/revokeById/' + at, {}, options);
  }

  me(at) {
    console.log('test');
    let header = new Headers({'Authorization':'Bearer ' + at});
    header.set('Content-Type', 'application/html');
    let options = new RequestOptions({
      headers: header,
      withCredentials: true,
      body: ''
    });
    return this.http.get(SEED_BASE_URL + '/seed/me', options);//.map(res => res.json())
    // .subscribe(res => this.loggedIn = res);
  }

  tryLogin(at) {
    if (at == 'dev') {
      this.loggedIn = {
        userFamilyName: 'dev',
        userGivenName: 'dev',
        userSecondName: 'dev',
        id: 0
      };
      return;
    }
    this.me(at).map(res => res.json())
      .catch(err => {this.loggedIn = null; this.login(); return Observable.of(false)})
        .subscribe(res => {this.loggedIn = res; console.log(this.loggedIn)});
  }

  getShortName() {
      let result = '';
      if(this.loggedIn) {
        if (this.loggedIn.userFamilyName) {
          result = result + this.loggedIn.userFamilyName + ' ';
        }
        if (this.loggedIn.userGivenName) {
          result = result + this.loggedIn.userGivenName[0] +'. ';
        }
        if (this.loggedIn.userSecondName) {
          result = result + this.loggedIn.userSecondName[0] + '.';
        }
      }
      return result;
  }
}
