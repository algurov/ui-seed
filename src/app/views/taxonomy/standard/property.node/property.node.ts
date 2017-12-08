import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MainService } from '../../../../services/main.service';
@Component({
  selector: 'property-node',
  templateUrl: './property.node.html',
  styleUrls: ['./property.node.scss']
})
export class PropertyNode {
  @Input() config: any;
  selectedUnit: any;
  taxonomyParams = [{field: 'standardCategory.id', value: 3}];
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() standardChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() textValueChange: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};
  options = [{value: 'VALUE', title: 'Значение'}, {value: 'NOT_ALLOWED', title: 'Не допускается'}, {value: 'NOT_LIMITED', title: 'Не ограничено'}];
  constructor(private dataService: DataService, private mainService: MainService) {
  }

  ngOnInit() {
    if (!this.config.data.propertyType) {
      this.config.data.propertyType = this.dataService.propertyType.find(item => item.id == 1);
    }
    if (this.config.data.unit) {
      this.selectedUnit = this.config.data.unit.id;
    }
  }

  onUnitSelection(event) {
      this.selectedUnit = event.value;
      this.config.data.unit = this.config.data.property.units.find(item => item.id == event.value);
      console.log(this.config.data);
  }

  onMinChanged(event) {
    this.config.data.goodsCategoryPropertyValues[0].min = event.target.value;
  }

  onMaxChanged(event) {
    this.config.data.goodsCategoryPropertyValues[0].max = event.target.value;
  }

  onTextChanged(event) {
    this.config.data.goodsCategoryPropertyValues[0].text = event.target.value;
  }

  onOptionChange(event) {
    this.config.data.researchCondition = event.value;
    switch (this.config.data.researchCondition) {
      case 'VALUE': this.config.data.goodsCategoryPropertyValues[0].text = ''; break;
      case 'NOT_ALLOWED': this.config.data.goodsCategoryPropertyValues[0].text = 'Не допускается'; break;
      case 'NOT_LIMITED': this.config.data.goodsCategoryPropertyValues[0].text = 'Не ограничено'; break;
    }
  }

  getPropertyName() {
      return this.config.data.property.nameRu;
  }

  isToggleVisible(node) {
    return node.parent.data.virtual;
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
