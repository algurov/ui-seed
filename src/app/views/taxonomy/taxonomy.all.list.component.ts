import { Component } from '@angular/core';
import { StringService } from '../../services/string.service';
import { taxonomy } from './taxonomy';
import { TaxonomyService } from '../../services/taxonomy.service';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'taxonomy-all',
  templateUrl: './taxonomy.all.list.component.html',
  styleUrls: ['./taxonomy.all.list.component.scss']
})
export class TaxonomyAllListComponent {
  taxonomyMap: Map<string, any>;
  taxonomyList: Array<any> = new Array<any>();
  constructor(private stringService: StringService, private taxonomyService: TaxonomyService,
    private router: Router, private mainService: MainService) {
    this.taxonomyMap = this.taxonomyService.taxonomyMap;
    taxonomy.forEach(item => {
      this.taxonomyList.push(item);
    });
  }

  openStandard() {
    this.router.navigate(['/main/settings/taxonomy/standard-list']);
  }
  openTaxonomy(taxonomy) {
    this.router.navigate(['/main/settings/taxonomy', taxonomy]);
  }

  ngOnInit() {
    this.mainService.menuChange.emit({name: 'EMPTY', state: false});
  }
}
