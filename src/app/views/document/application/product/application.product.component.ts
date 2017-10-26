import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-product',
  templateUrl: './application.product.component.html',
  styleUrls: ['./application.product.component.scss']
})
export class ApplicationProductComponent {
  @Input() data;

  constructor(private stringService: StringService) {}

  selectProduct(product) {
    this.data.goods = product;
    this.data.goodsName = product.fullNameRu;
  }
}
