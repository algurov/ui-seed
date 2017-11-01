import { Component, Input } from '@angular/core';
import { TaxonomyService } from '../../../services/taxonomy.service';
import { ITreeOptions } from 'angular2-tree-component';

@Component({
  selector: 'taxonomy-select',
  templateUrl: './select.taxonomy.component.html',
  styleUrls: ['./select.taxonomy.component.scss']
})
export class SelectTaxonomyComponent {
  @Input() taxonomy;
  options: ITreeOptions = {
    idField: 'uuid'
  };
  loaded = false;
  nodes = [
    //{id: 1, name: 'lol'}
  ];
  constructor(private taxonomyService: TaxonomyService) {
  }

  ngOnInit() {
    if(this.taxonomy) {
      this.taxonomyService.loadTaxonomyData(this.taxonomy).subscribe(res => {
        res.content.forEach(item => {
          if (!item.name) {
            if (item.fullName) {
              item['name'] = item.fullName;
            }
            if (item.fullNameRu) {
              item['name'] = item.fullNameRu;
            }
          }
          this.nodes.push(item);
        });
        console.log(this.nodes);
        this.loaded = true;
      });
    }
  }
}
