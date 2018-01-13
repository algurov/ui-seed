import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SEED_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';

@Injectable()
export class CalculationService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  createCalculation(calculation): Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/calculation`, calculation, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }

  updateCalculation(patch, id): Observable<any> {
    return this.http.patch(`${SEED_BASE_URL}/seed/calculation/` + id, patch, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }

  getCalculationList() : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/calculation`, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }
  deleteCalculation(calc): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/calculation/` + calc.id, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }
  getCalculationById(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/calculation/` + id, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }

  getCalcuLationByApplicationId(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/calculation?application.id=` + id, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }
  getPricelistItemList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/pricelistItem`, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  getPricelistItemListByTypeAndBranchOffice(typeId, branchOfficeId): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/pricelistItem?pricelistType.id=` + typeId + '&branchOffices.id=' + branchOfficeId, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  getPricelistTypeList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/pricelistType`, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  getPriceCoefficientList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/priceCoefficient`, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

}
