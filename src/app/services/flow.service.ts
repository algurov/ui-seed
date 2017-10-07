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



@Injectable()
export class FlowService extends RequestBase {
  lastFlowResponse: FlowResponse;
  constructor(public http: Http, public router: Router, public dlgService: DialogService) {
    super(http);
  }

  createOptions(params?): RequestOptions {
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('Authorization', 'Bearer ' + Cookie.get('at'));
    let flowOptions = new RequestOptions({
      headers: header,
      withCredentials: true,
      params: params
    });
    return flowOptions;
  }

  startPasswordRecovery() {
    this.dlgService.block = true;
    let headers = new Headers();
    headers.append('Content-Type',
     'application/x-www-form-urlencoded');
    return this.http.get(SEED_BASE_URL + '/seed/startPasswordRecovery', {headers:headers, withCredentials: true}).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  sendEmailRecovery(email) {
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    body.set('_eventId', 'next');
    body.set('email', email);
    let headers = new Headers();
    headers.append('Content-Type',
     'application/x-www-form-urlencoded');
     headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post(SEED_BASE_URL + '/seed/startPasswordRecovery', body.toString(), {headers:headers, withCredentials: true}).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  startPasswordResetByLink(link) {
    let headers = new Headers();
    headers.append('Content-Type',
     'application/x-www-form-urlencoded');
    return this.http.get(SEED_BASE_URL + '/seed'+ link, {headers:headers, withCredentials: true})
      .map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  sendPasswordRecover(password) {
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    body.set('_eventId', 'save');
    body.set('password', password);
    let headers = new Headers();
    headers.append('Content-Type',
     'application/x-www-form-urlencoded');
     headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post(SEED_BASE_URL + '/seed/passwordResetByLink', body.toString(), {headers:headers, withCredentials: true}).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  startRegistartion(code): Subscription {
    let headers = new Headers();
    headers.append('Content-Type',
     'application/x-www-form-urlencoded');
    return this.http.get(SEED_BASE_URL + '/seed'+ code, {headers:headers, withCredentials: true})
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
    this.dlgService.block = true;
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
    this.dlgService.block = true;
    let body = new URLSearchParams();
    body.set('execution', this.lastFlowResponse.execution);
    body.set('_eventId', 'do');
    this.getParameter('email', user, body);
    body.set('roles', user.roles);
    this.getParameter('userSecondName', user, body);
    this.getParameter('userGivenName', user, body);
    this.getParameter('userFamilyName', user, body);
    body.set('branchOffices', '');
    this.getParameter('positions', user, body);
    body.set('contacts', user.contact);

    console.log(body);
    console.log(body.toString());

    let opts = this.createOptions(body);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + Cookie.get('at'));

  headers.append('Content-Type',
     'application/x-www-form-urlencoded');

    return this.http.post(SEED_BASE_URL + '/seed/registration',body.toString(), {headers:headers, withCredentials: true}).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  processResponce(response) {
    console.log(response);
    this.dlgService.block = false;
    let flowResponse = new FlowResponse(response);
    if (flowResponse.step == 'fail') {
      if (flowResponse.view) {
        this.dlgService.showMessageDlg('Error ' + flowResponse.view.code? flowResponse.view.code: '' , flowResponse.view.error);
      } else {
        this.dlgService.showMessageDlg('Error', 'Something went wrong');
      }
      if (this.lastFlowResponse) {
        let navigateTo = this.lastFlowResponse.getFlowName() + '_fail';
        this.lastFlowResponse = null;
        this.navigateToState(navigateTo);
      } else {
        this.navigateToState('fail');
      }
      return;
    }
    if (flowResponse.isError()) {
      //this.dlgService.showMessageDlg('Error', flowResponse.view.error);
      this.dlgService.showMessageDlg('Error', flowResponse.getError());
    }
    if (flowResponse.isSuccess()) {

      this.dlgService.showNotification('Операция успешна')
      let navigateTo = this.lastFlowResponse.getFlowName() + '_success';
      this.lastFlowResponse = null;
      this.navigateToState(navigateTo);
      return;
    }
    if (this.lastFlowResponse) {
      if (this.lastFlowResponse.step != flowResponse.step) {
        this.lastFlowResponse = flowResponse;
        this.navigateToState(flowResponse.getFlowName());
      } else {
        this.lastFlowResponse = flowResponse;
      }
    } else {
      this.lastFlowResponse = flowResponse;
      this.navigateToState(flowResponse.getFlowName());
    }
  }

  navigateToState(state) {
    this.router.navigate([this.getRouteByState(state)]);
  }

  getRouteByState(state): string {
    return STATES[state];
  }
}
