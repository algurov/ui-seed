import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class RequestBase {
  headers = new Headers();
  noPreFlightHeaders = new Headers();
  options = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  optionsNoPre = new RequestOptions({
    headers: this.noPreFlightHeaders,
    withCredentials: true
  });
  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + Cookie.get('at'));
    this.noPreFlightHeaders.append('Content-Type', 'text/plain');
  }
}
