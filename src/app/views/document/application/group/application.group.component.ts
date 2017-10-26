import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';

@Component({
  selector: 'application-group',
  templateUrl: './application.group.component.html',
  styleUrls: ['./application.group.component.scss']
})
export class ApplicationGroupComponent {
  @Input() data;
  storageOptions: Array<any>;
  selectedStorage: any;
  constructor(private stringService: StringService, private taxonomyService: TaxonomyService) {
    this.taxonomyService.loadTaxonomyData('Storage').subscribe(res => {
      this.storageOptions = res.content;
    });
  }

  ngOnInit() {
    if (this.data.goodsStorageRelation) {
      this.selectedStorage = +this.data.goodsStorageRelation.id;
    }
  }

  storageChanged(event) {
    this.selectedStorage = event.value;
    this.data.goodsStorageRelation = this.storageOptions.find(item => item.id == this.selectedStorage);
  }
}
