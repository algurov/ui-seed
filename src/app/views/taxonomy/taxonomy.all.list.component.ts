import { Component } from '@angular/core';
import { StringService } from '../../services/string.service';
import { taxonomy } from './taxonomy';
@Component({
  selector: 'taxonomy-all',
  templateUrl: './taxonomy.all.list.component.html',
  styleUrls: ['./taxonomy.all.list.component.scss']
})
export class TaxonomyAllListComponent {
  taxonomyList: Array<any> = new Array<any>();
  constructor(private stringService: StringService) {
    taxonomy.forEach(item => {
      this.taxonomyList.push(item);
    });
  }
}
