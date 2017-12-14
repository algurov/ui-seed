import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class RequestBase {
  headers = new Headers();
  pdfHeaders = new Headers();
  noPreFlightHeaders = new Headers();
  pdfOptions = new RequestOptions({
    headers: this.pdfHeaders,
    withCredentials: true
  });
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

    this.pdfHeaders.append('Content-Type', 'application/json');
    this.pdfHeaders.append('Authorization', 'Bearer ' + Cookie.get('at'));
    //this.pdfHeaders.append('Accept', 'application/pdf');
  }
}
