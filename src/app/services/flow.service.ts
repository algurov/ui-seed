import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams} from '@angular/http';
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
  constructor(public http: Http, public router : Router, public dlgService: DialogService) {
    super(http);
  }

  createOptions(params?): RequestOptions {
      let header = new Headers();
      header.append('Access-Control-Allow-Headers', 'Content-Type');
      header.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      header.append('Access-Control-Allow-Origin', '*');
      let flowOptions = new RequestOptions({
         headers: header,
        withCredentials: true,
         params: params
      });
      return flowOptions;
  }

  aksNewUser(): Subscription {
    return this.http.get(SEED_BASE_URL + '/seed/registration', this.createOptions()).map(res => res.json())
      .subscribe(res => this.processResponce(res));
  }

  sendNewUser(user: User): Subscription {
    let params = new URLSearchParams();
    params.append('execution', this.lastFlowResponse.execution);
    params.append('_eventId', 'do');
    params.append('email', user.email);
    params.append('role', user.roles[0].roleName);
    let opts = this.createOptions(params);

    return this.http.post(SEED_BASE_URL + '/seed/registration', opts).map(res => res.json())
    .subscribe(res => this.processResponce(res));
  }

  processResponce(response) {
    console.log(response);
    let flowResponse = new FlowResponse(response);
    if (flowResponse.isError()) {
      this.dlgService.showMessageDlg('Error ' + flowResponse.view.code, flowResponse.view.reason);
    }
    if (flowResponse.isSuccess()) {
      this.dlgService.showMessageDlg('Success', 'Action performed');
      return;
    } 
    if(this.lastFlowResponse.step != flowResponse.step) {
      this.lastFlowResponse = flowResponse;
      this.navigateToState(flowResponse.step)
    } else {
      this.lastFlowResponse = flowResponse;
    }

  }

  navigateToState(state) {
    this.router.navigateByUrl(this.getRouteByState(state));
  }

  getRouteByState(state) : string {
    return STATES[state];
  }
}
