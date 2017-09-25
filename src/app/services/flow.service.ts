import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RequestBase } from './request.base';
import { Router } from '@angular/router';
import { SEED_BASE_URL, API_BASE_URL, AUTH_SERVER_URL, AUTH_CONSUMER_URL, STATES } from './constants';
import { FlowResponse } from '../models/flow.response';
import { User } from '../models/user';
import { UserToSend } from '../views/user/user.edit.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DialogService } from './dialog.service';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class FlowService extends RequestBase {
  lastFlowResponse: FlowResponse;
  constructor(public http: Http, public router: Router, public dlgService: DialogService,
  public snackBar: MdSnackBar) {
    super(http);
  }

  createOptions(params?): RequestOptions {
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    let flowOptions = new RequestOptions({
      headers: header,
      withCredentials: true,
      params: params
    });
    return flowOptions;
  }

  startRegistartion(code): Subscription {
    return this.http.get(SEED_BASE_URL + '/seed'+ code, this.createOptions())
      .map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  sendLoginAndPassword(login: string, password: string): Subscription {
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    body.set('_eventId', 'save');
    body.set('login', login);
    body.set('password', password);
    ///let toSend = 'execution=' + this.lastFlowResponse.execution + '&_eventId=save&login=' + encodeURIComponent(login) + '&password=' + encodeURIComponent(password);
    let email = window.localStorage.getItem('email');
    let code = window.localStorage.getItem('code');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('code');
    let opts = this.createOptions();
    let headers = new Headers();
    headers.append('Content-Type',
     'application/x-www-form-urlencoded');
     headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post(SEED_BASE_URL + '/seed/registrationCompletionByLink', body.toString(), {headers:headers, withCredentials: true}).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  aksNewUser(): Subscription {
    return this.http.get(SEED_BASE_URL + '/seed/registration', this.createOptions()).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  convertArrayToString(arr: Array<string>) {
    if (arr) {
      let result = '';
      arr.forEach(item => {
        result += item + ',';
      })
      return result.substr(0, result.length - 1);
    } else {
      return '';
    }
  }

  getParameter(param: string, user: UserToSend, body: URLSearchParams) {
    if (user[param] && user[param] != '') {
      if(user[param] instanceof Array) {
        if (user[param].length <= 0) {
          body.set(param, '');
          return;
        }
      }
      //return '&' + param + '=' + encodeURIComponent(user[param]);
      body.set(param, user[param]);
      return;
    }
    //return '&' + param + '=';
    body.set(param, '');
  }

  sendNewUser(user: UserToSend): Subscription {
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    body.set('_eventId', 'do');
    this.getParameter('email', user, body);
    body.set('role', user.role);
    this.getParameter('userSurName', user, body);
    this.getParameter('userGivenName', user, body);
    this.getParameter('userFamilyName', user, body);
    body.set('branchOffice', '');
    this.getParameter('position', user, body);
    body.set('contact', user.contact);

    console.log(body);
    console.log(body.toString());

    let opts = this.createOptions(body);
    let headers = new Headers();
  headers.append('Content-Type',
     'application/x-www-form-urlencoded');
    return this.http.post(SEED_BASE_URL + '/seed/registration',body.toString(), {headers:headers, withCredentials: true}).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  processResponce(response) {
    console.log(response);
    let flowResponse = new FlowResponse(response);
    if (flowResponse.step == 'fail') {
      if (flowResponse.view) {
        this.dlgService.showMessageDlg('Error ', flowResponse.view.error);
      } else {
        this.dlgService.showMessageDlg('Error', 'Something went wrong');
      }
      this.lastFlowResponse = flowResponse;
      return;
    }
    if (flowResponse.isError()) {
      this.dlgService.showMessageDlg('Error', flowResponse.view.error);
    }
    if (flowResponse.isSuccess()) {

      //this.dlgService.showMessageDlg('Success', 'Action performed');
      this.snackBar.open('Success', '', {
      duration: 2000,
      });
      let navigateTo = this.lastFlowResponse.step + '_success';
      this.lastFlowResponse = null;
      this.navigateToState(navigateTo);
      return;
    }
    if (this.lastFlowResponse) {
      if (this.lastFlowResponse.step != flowResponse.step) {
        this.lastFlowResponse = flowResponse;
        this.navigateToState(flowResponse.step)
      } else {
        this.lastFlowResponse = flowResponse;
      }
    } else {
      this.lastFlowResponse = flowResponse;
      this.navigateToState(flowResponse.step)
    }


  }

  navigateToState(state) {
    this.router.navigateByUrl(this.getRouteByState(state));
  }

  getRouteByState(state): string {
    return STATES[state];
  }
}
