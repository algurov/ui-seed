import { Injectable } from '@angular/core';
import { SEED_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { taxonomy } from '../views/taxonomy/taxonomy';

@Injectable()
export class TaxonomyService extends RequestBase {
  taxonomyMap: Map<string, any> = new Map<string, any>();
  constructor(public http: Http) {
    super(http);
    taxonomy.forEach(item => {
      this.taxonomyMap.set(item.name, item);
    });
  }

  getTaxonomy(name) {
    return this.taxonomyMap.get(name);
  }

  loadTaxonomyData(name) : Observable<any> {
    return this.http.get(SEED_BASE_URL + '/seed/' + this.getTaxonomy(name).api, this.options)
    .map(res => res.json());
  }

  searchTaxonomyDataByParams(name, params : Array<any>): Observable<any> {
      let paramString = '';
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      return this.http.get(`${SEED_BASE_URL}/seed/`+ this.getTaxonomy(name).api +`?` + paramString, this.options).map(res => res.json());
  }

  searchTaxonomyDataBySubQuery(name, subQuery, subQueryArg, params?): Observable<any> {
    let paramString = '';
    if (params) {
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
    }
    return this.http.get(`${SEED_BASE_URL}/seed/`+ this.getTaxonomy(name).api +`/`+subQuery +`/`+subQueryArg + (params? `?` + paramString : ``), this.options).map(res => res.json());
  }

  customQuery(query: string): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/` + query, this.options).map(res => res.json());
  }

  getStandardList() : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/standard`, this.options).map(res => res.json());
  }

  getStandardById(id: number) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/standard/`+id, this.options).map(res => res.json());
  }

  updateStandard(standard): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/standard`, standard, this.options).map(res => res.json());
  }

  createStandard(standard): Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/standard`, standard, this.options).map(res => res.json());
  }

  deleteStandard(standard): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/standard/`+ standard.id,  this.options).map(res => res.json());
  }

  getGoodsCategoryList(): Observable<any> {
      return this.http.get(`${SEED_BASE_URL}/seed/goodsCategory`, this.options).map(res => res.json());
  }

  getGoodsCategoryPropertyByStandardIdAndGoodsCategoryId(standardId, goodsCategoryId): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/goodsCategoryProperty?standard.id=` + standardId + '&goodsCategory.id='+goodsCategoryId, this.options).map(res => res.json());
  }

  deleteGoodsCategoryProperty(id) {
    return this.http.delete(`${SEED_BASE_URL}/seed/goodsCategoryProperty/`+ id,  this.options).map(res => res.json());
  }

  createProperties(properties) : Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/goodsCategoryProperty`, properties, this.options).map(res => res.json());
  }

  updateProperties(properties) : Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/goodsCategoryProperty`, properties, this.options).map(res => res.json());
  }

  // deleteProperties(properties) : Observable<any> {
  //   //return this.http.delete(`${SEED_BASE_URL}/seed/goodsCategoryProperty`, properties, this.options).map(res => res.json());
  // }

  updatePropertiesPatch(properties) : Observable<any> {
    return this.http.patch(`${SEED_BASE_URL}/seed/goodsCategoryProperty`, properties, this.options).map(res => res.json());
  }

  getPropertyById(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/property/` + id, this.options).map(res => res.json());
  }

  getPropertyByDescription(desc): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/property?description=` + desc, this.options).map(res => res.json());
  }

  getPropertyList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/property`, this.options).map(res => res.json());
  }

  createProperty(property): Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/property`, property, this.options).map(res => res.json());
  }

  updateProperty(property): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/property`, property, this.options).map(res => res.json());
  }

  deleteProperty(property): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/property/` + property.id, this.options).map(res => res.json());
  }

  searchPropertyByNameRu(name) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/property?nameRu=`+name, this.options).map(res => res.json());
  }

  getUnitById(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/unit/` + id, this.options).map(res => res.json());
  }

  getUnitList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/unit`, this.options).map(res => res.json());
  }

  createUnit(unit): Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/unit`, unit, this.options).map(res => res.json());
  }

  updateUnit(unit): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/unit`, unit, this.options).map(res => res.json());
  }

  deleteUnit(unit): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/unit/` + unit.id, this.options).map(res => res.json());
  }

  searchUnitByName(name) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/unit?nameRu=`+name, this.options).map(res => res.json());
  }

}
