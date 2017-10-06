import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './request.base';
import { Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { API_BASE_URL, AUTH_SERVER_URL, AUTH_CONSUMER_URL, AUTH_SERVER_BASE_URL, SEED_BASE_URL} from './constants';

@Injectable()
export class AuthService extends RequestBase {
  loggedIn = null;
  constructor(public http: Http, public router : Router, public oauthService : OAuthService) {
    super(http);
  }

  login(): void {
      this.http.get(API_BASE_URL +'/login-main').subscribe(res=>window.location.href = res.text());
  }

  logout() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.post(AUTH_SERVER_BASE_URL +'/auth-server/logout', {}, this.options);
  }

  me(at) {
    let header = new Headers({'Authorization':'Bearer ' + at});
    header.append('Authorization', 'Bearer ' + at);
    let options = new RequestOptions({
      headers: header,
      withCredentials: true,
      body: ''
    });
    return this.http.get(SEED_BASE_URL + '/seed/me', options);//.map(res => res.json())
    // .subscribe(res => this.loggedIn = res);
  }

  tryLogin(at) {
    this.me(at).map(res => res.json()).catch(err => {this.loggedIn = null; return Observable.of(false)}).subscribe(res => this.loggedIn = res);
  }

  getShortName() {
      let result = '';
      if (this.loggedIn.userFamilyName) {
        result = result + this.loggedIn.userFamilyName + ' ';
      }
      if (this.loggedIn.userGivenName) {
        result = result + this.loggedIn.userGivenName[0] +'. ';
      }
      if (this.loggedIn.userSecondName) {
        result = result + this.loggedIn.userSecondName[0] + '.';
      }
      return result;
  }
}
