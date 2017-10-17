import { Component } from '@angular/core';
import { StringService } from '../../services/string.service';
import { taxonomy } from './taxonomy';
import { TaxonomyService } from '../../services/taxonomy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'taxonomy-all',
  templateUrl: './taxonomy.all.list.component.html',
  styleUrls: ['./taxonomy.all.list.component.scss']
})
export class TaxonomyAllListComponent {
  taxonomyMap: Map<string, any>;
  taxonomyList: Array<any> = new Array<any>();
  constructor(private stringService: StringService, private taxonomyService: TaxonomyService,
    private router: Router) {
    this.taxonomyMap = this.taxonomyService.taxonomyMap;
    taxonomy.forEach(item => {
      this.taxonomyList.push(item);
    });
  }

  openTaxonomy(taxonomy) {
    this.router.navigate(['/main/taxonomy', taxonomy]);
  }
}
