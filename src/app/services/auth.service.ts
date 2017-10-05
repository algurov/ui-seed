import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestBase } from './request.base';
import { Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { API_BASE_URL, AUTH_SERVER_URL, AUTH_CONSUMER_URL, AUTH_SERVER_BASE_URL, SEED_BASE_URL} from './constants';

@Injectable()
export class AuthService extends RequestBase {
  constructor(public http: Http, public router : Router, public oauthService : OAuthService) {
    super(http);
  }

  login(): void {
      this.http.get(API_BASE_URL +'/login-main').subscribe(res=>window.location.href = res.text());
  }

  logout() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.post(AUTH_SERVER_BASE_URL +'/auth-server/logout', {}, {withCredentials: true});
  }

  me(at) {

    let header = new Headers();
    header.append('Authorization', 'Bearer ' + at);
    let flowOptions = new RequestOptions({
      headers: header,
      withCredentials: true,
      body: ''
    });

console.log(flowOptions);
    return this.http.get(SEED_BASE_URL + '/seed/me', flowOptions).map(res => res.json());
  }
}
