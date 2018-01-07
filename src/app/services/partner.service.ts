import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SEED_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { Partner } from '../models/partner';
import { MainService } from './main.service';

@Injectable()
export class PartnerService extends RequestBase {

  constructor(public http: Http, private mainService: MainService) {
    super(http);
  }

  createPartner(partner: Partner): Observable<Partner> {
      return this.http.post(`${SEED_BASE_URL}/seed/partner`, partner, this.getOptions(this.OPT.AUTH_JSON))
      .map(res => res.json());
  }

  getPartnerList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/partner`, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  getPartnerByDocumentNumber(number): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/partner?documentNumber=` + number, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  searchPartnersByParams(params : Array<any>): Observable<any> {
      let paramString = '';
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      return this.http.get(`${SEED_BASE_URL}/seed/partner?` + paramString, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }

  updatePartner(partner: Partner): Observable<Partner> {
    return this.http.put(`${SEED_BASE_URL}/seed/partner`, partner, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  getPartnerById(id): Observable<Partner> {
    return this.http.get(`${SEED_BASE_URL}/seed/partner/` + id , this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  deletePartner(partner) : Observable<Partner> {
    return this.http.delete(`${SEED_BASE_URL}/seed/partner/` + partner.id, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }
}
