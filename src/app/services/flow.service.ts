import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RequestBase } from './request.base';
import { Router } from '@angular/router';
import { SEED_BASE_URL, API_BASE_URL, AUTH_SERVER_URL, AUTH_CONSUMER_URL, STATES } from './constants';
import { FlowResponse } from '../models/flow.response';
import { User } from '../models/user';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DialogService } from './dialog.service';

@Injectable()
export class FlowService extends RequestBase {
  lastFlowResponse: FlowResponse;
  constructor(public http: Http, public router: Router, public dlgService: DialogService) {
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

  startRegistartion(email, code): Subscription {
    return this.http.get(SEED_BASE_URL + '/seed/registrationCompletionByLink?email='
      + email + '&code=' + code, this.createOptions())
      .map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  sendLoginAndPassword(login: string, password: string): Subscription {
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    body.set('login', login);
    body.set('password', password);
    ///let toSend = 'execution=' + this.lastFlowResponse.execution + '&_eventId=save&login=' + encodeURIComponent(login) + '&password=' + encodeURIComponent(password);
    let email = window.localStorage.getItem('email');
    let code = window.localStorage.getItem('code');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('code');
    let opts = this.createOptions();
    return this.http.post(SEED_BASE_URL + '/seed/registrationCompletionByLink?email='
      + email + '&code=' + code, body).map(res => res.json())
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

  getParameter(param: string, user: User, body: URLSearchParams) {
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

  sendNewUser(user: User): Subscription {
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    this.getParameter('email', user, body);
    body.set('role', this.convertArrayToString(user.role));
    this.getParameter('userGivenName', user, body);
    this.getParameter('userSurName', user, body);
    this.getParameter('userFamilyName', user, body);
    //this.getParameter('phoneNumber', user, body);
    body.set('position', '');
    //this.getParameter('position', user, body);
    //this.getParameter('address', user, body);
    this.getParameter('branchOffice', user, body);
    this.getParameter('contact', user, body);
    console.log(body);
    // let toSend = 'execution=' + this.lastFlowResponse.execution
    //   + '&_eventId=do&email=' + user.email
    //   + '&role=' + this.convertArrayToString(user.role)
    //   + this.getParameter('userGivenName', user)
    //   + this.getParameter('userSurName', user)
    //   + this.getParameter('userFamilyName', user)
    //   + this.getParameter('phoneNumber', user)
    //   + this.getParameter('position', user)
    //   + this.getParameter('address', user)
    //   + this.getParameter('branchOffice', user);
    // console.log(toSend);

    let opts = this.createOptions(body);
    return this.http.post(SEED_BASE_URL + '/seed/registration', body).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  processResponce(response) {
    console.log(response);
    let flowResponse = new FlowResponse(response);
    if (flowResponse.step == 'fail') {
      if (flowResponse.view) {
        this.dlgService.showMessageDlg('Error ' + flowResponse.view.code, flowResponse.view.reason);
      } else {
        this.dlgService.showMessageDlg('Error', 'Something went wrong');
      }
      this.lastFlowResponse = flowResponse;
      return;
    }
    if (flowResponse.isError()) {
      this.dlgService.showMessageDlg('Error ' + flowResponse.view.code, flowResponse.view.reason);
    }
    if (flowResponse.isSuccess()) {
      this.dlgService.showMessageDlg('Success', 'Action performed');
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
