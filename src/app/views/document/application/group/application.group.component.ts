import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'application-group',
  templateUrl: './application.group.component.html',
  styleUrls: ['./application.group.component.scss']
})
export class ApplicationGroupComponent {
  @Input() data;
  storageOptions: Array<any>;
  selectedStorage: any;
  constructor(private stringService: StringService, private taxonomyService: TaxonomyService,
    private mainService: MainService) {
    this.taxonomyService.loadTaxonomyData('Storage').subscribe(res => {
      this.storageOptions = res.content;
    });
    this.mainService.applicationLoaded.subscribe(item => {
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
