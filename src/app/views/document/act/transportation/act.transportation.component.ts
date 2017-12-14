import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { DataService } from '../../../../services/data.service';
@Component({
  selector: 'act-transportation',
  templateUrl: './act.transportation.component.html',
  styleUrls: ['./act.transportation.component.scss']
})
export class ActTransportationComponent {
  @Input() data: any;
  date: any;
  subscription: any
  sender: any;
  storageOptions: Array<any>;
  selectedStorage: any;
  constructor(private mainService: MainService, private taxonomyService: TaxonomyService,
    private dataService: DataService) {
    this.taxonomyService.searchTaxonomyDataByParams('Storage', [{field:'isTransport', value: true}]).subscribe(res => {
      this.storageOptions = res.content;
    });
    this.subscription = this.mainService.actLoaded.subscribe(item => {
      if (item.receiptDate) {
          this.date = new Date(item.receiptDate);
      }
      if (item.cargoSender) {
        this.sender = item.cargoSender.partner.name;
      }
      if (item.transport) {
        this.selectedStorage = +item.transport.id;
      }
    });
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);
    this.data.receiptDate = this.date.getTime();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  storageChanged(event) {
    this.selectedStorage = event.value;
    this.data.transport = this.storageOptions.find(item => item.id == this.selectedStorage);
  }
}
