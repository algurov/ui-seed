import { Component, Input } from '@angular/core';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'act-place',
  templateUrl: './act.place.component.html',
  styleUrls: ['./act.place.component.scss']
})
export class ActPlaceComponent {
  @Input() data: any;
  storageOptions: Array<any>;
  selectedStorage: any;
  constructor( private taxonomyService: TaxonomyService,
    private mainService: MainService) {
    this.taxonomyService.loadTaxonomyData('Storage').subscribe(res => {
      this.storageOptions = res.content;
    });
    this.mainService.actLoaded.subscribe(item => {
      if (item.productStorage) {
        this.selectedStorage = +item.productStorage.id;
      }
    });
  }

  ngOnInit() {
    if (this.data.productStorage) {
      this.selectedStorage = +this.data.productStorage.id;
    }
  }

  storageChanged(event) {
    this.selectedStorage = event.value;
    this.data.productStorage = this.storageOptions.find(item => item.id == this.selectedStorage);
  }
}
