import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SEED_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { Partner } from '../models/partner';
import { MainService } from './main.service';

@Injectable()
export class ApplicationService extends RequestBase {

  constructor(public http: Http, private mainService: MainService) {
    super(http);
  }

  createApplication(application: any): Observable<any> {
      return this.http.post(`${SEED_BASE_URL}/seed/application`, application, this.options)
      .map(res => res.json());
  }

  getApplicationList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/application`, this.options)
    .map(res => res.json());
  }

  getApplicationById(number): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/application/` + number, this.options)
    .map(res => res.json());
  }

  searchApplicationByParams(params : Array<any>): Observable<any> {
      let paramString = '';
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      return this.http.get(`${SEED_BASE_URL}/seed/application?` + paramString, this.options).map(res => res.json());
  }

  updateApplication(application: any): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/application`, application, this.options)
    .map(res => res.json());
  }

  deleteApplication(application) : Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/application/` + application.id, this.options)
    .map(res => res.json());
  }
}
