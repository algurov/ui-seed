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
}
