import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'act-product',
  templateUrl: './act.product.component.html',
  styleUrls: ['./act.product.component.scss']
})
export class ActProductComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  taxonomyParams = [{field: 'standardCategory.id', value: 4}];
  constructor(private mainService: MainService) {
    this.subscription = this.mainService.actLoaded.subscribe(item => {
      if (item.goodsProductionDate) {
          this.date = new Date(item.goodsProductionDate);
      }
    });
  }

  onDateChange(event) {
    this.date = event.value;
    this.data.goodsProductionDate = event.value.getTime();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onStandardChange(standard) {
    this.data.standard = standard;
  }
}
