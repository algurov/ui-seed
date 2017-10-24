import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-parameter',
  templateUrl: './product.parameter.component.html',
  styleUrls: ['./product.parameter.component.scss']
})
export class ProductParameterComponent {
  @Input() config: any;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};
  options = [{value: 0, title: 'Значение'}, {value: -1, title: 'Не допускается'}, {value: 1, title: 'Не ограничено'}];

  ngOnInit() {
    console.log(this.config.data);
  }
  isValue() {
    if (this.config.data.option == 0) {
      return true;
    }
    return false;
  }

  onStateChanged(state) {
    this.config.data.state = state;
  }

  collectData() {
    //this.data.selectedOption = this.selectedOption;
    return this.data;
  }

  removeItem() {
    this.onRemove.emit(this.config);
  }

}
