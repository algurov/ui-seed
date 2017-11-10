import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';

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
  constructor(private mainService: MainService, private taxonomyService: TaxonomyService) {
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
    this.date = event.value;
    this.data.receiptDate = event.value.getTime();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  storageChanged(event) {
    this.selectedStorage = event.value;
    this.data.transport = this.storageOptions.find(item => item.id == this.selectedStorage);
  }
}
