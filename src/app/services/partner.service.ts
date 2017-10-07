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
      return this.http.post(`${SEED_BASE_URL}/seed/partner`, partner, this.options)
      .map(res => res.json());
  }

  getPartnerList(page, number): Observable<Partner[]> {
    return this.http.get(`${SEED_BASE_URL}/seed/partner?page=`+ page + '&size='+ number, this.options)
    .map(res => res.json());
  }

  updatePartner(partner: Partner): Observable<Partner> {
    return this.http.put(`${SEED_BASE_URL}/seed/partner`, partner, this.options)
    .map(res => res.json());
  }

  getPartnerById(id): Observable<Partner> {
    return this.http.get(`${SEED_BASE_URL}/seed/partner/` + id , this.options)
    .map(res => res.json());
  }

  deletePartner(partner) : Observable<Partner> {
    return this.http.delete(`${SEED_BASE_URL}/seed/partner/` + partner.id, this.options)
    .map(res => res.json());
  }
}
