import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'application-product',
  templateUrl: './application.product.component.html',
  styleUrls: ['./application.product.component.scss']
})
export class ApplicationProductComponent {
  @Input() data;
  date: any;
  subscription: any;
  weightControl = new FormControl(['', Validators.required]);
  constructor(private stringService: StringService, private mainService: MainService) {
    this.subscription = this.mainService.applicationLoaded.subscribe(item => {
      if (item.goodsProductionDate) {
        this.date = new Date(item.goodsProductionDate);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    if (this.data.goodsProductionDate) {
      this.date = new Date(this.data.goodsProductionDate);
    }
  }
  selectProduct(product) {
    this.data.goods = product;
    this.data.goodsName = product.fullNameRu;
  }

  onDateChange(event) {
    this.data.goodsProductionDate = event.value.getTime();
    this.date = event.value;
  }
}
