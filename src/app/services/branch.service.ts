import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SEED_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { MainService } from './main.service';

@Injectable()
export class BranchOfficeService extends RequestBase {

  constructor(public http: Http, private mainService: MainService) {
    super(http);
  }

  createBranchOffice(branch): Observable<any> {
      return this.http.post(`${SEED_BASE_URL}/seed/branchOffice`, branch, this.options)
      .map(res => res.json());
  }

  getBranchOfficeList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/branchOffice`, this.options)
    .map(res => res.json());
  }

  searchBeranchOfficeByParams(params : Array<any>): Observable<any> {
      let paramString = '';
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      return this.http.get(`${SEED_BASE_URL}/seed/branchOffice?` + paramString, this.options).map(res => res.json());
  }

  updateBranchOffice(branch): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/branchOffice`, branch, this.options)
    .map(res => res.json());
  }

  getBranchOfficeById(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/branchOffice/` + id , this.options)
    .map(res => res.json());
  }

  deleteBranchOffice(branch) : Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/branchOffice/` + branch.id, this.options)
    .map(res => res.json());
  }
}
