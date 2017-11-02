import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'product-parameter',
  templateUrl: './product.parameter.component.html',
  styleUrls: ['./product.parameter.component.scss']
})
export class ProductParameterComponent {
  @Input() config: any;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};
  options = [{value: 'VALUE', title: 'Значение'}, {value: 'NOT_ALLOWED', title: 'Не допускается'}, {value: 'NOT_LIMITED', title: 'Не ограничено'}];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (this.config.data.customName) {
      this.config.data.customName = this.config.data.customName;
    } else {
      this.config.data.customName = this.config.data.property.nameRu;
    }
    if (!this.config.data.researchCondition) {
      this.config.data.researchCondition = this.options[0].value;
    }
    if (!this.config.data.propertyType) {
      this.config.data.propertyType = this.dataService.propertyType.find(item => item.id == 1);
    }
    console.log(this.config);
  }

  getPropertyUnit() {
    if (this.config.data.property.units && this.config.data.property.units.length > 0) {
      return this.config.data.property.units[0].nameRu;
    } else {
      return '';
    }
  }

  isToggleVisible(node) {
    return node.parent.data.virtual;
  }
  isValue() {
    if (this.config.data.researchCondition == 'VALUE') {
      return true;
    }
    return false;
  }

  onOptionChange(event) {
    this.config.data.researchCondition = event.value;
    switch (this.config.data.researchCondition) {
      case 'VALUE': this.config.data.customText = ''; break;
      case 'NOT_ALLOWED': this.config.data.customText = 'Не допускается'; break;
      case 'NOT_LIMITED': this.config.data.customText = 'Не ограничено'; break;
    }
  }
  onStateChanged(propertyType) {
    this.config.data.propertyType = propertyType;
    if (this.config.hasChildren) {
    this.config.children.forEach(item => {
      this.updateChildrenState(item, propertyType);
    });
    }
  }

  updateChildrenState(node, propertyType) {
    node.data.propertyType = propertyType;
    if (node.hasChildren) {
    node.children.forEach(item => {
      this.updateChildrenState(item, propertyType);
    });
    }
  }

  collectData() {
    //this.data.selectedOption = this.selectedOption;
    return this.data;
  }

  removeItem() {
    this.onRemove.emit(this.config);
  }

}
