import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MainService } from '../../../../services/main.service';
@Component({
  selector: 'param-node',
  templateUrl: './param.node.html',
  styleUrls: ['./param.node.scss']
})
export class ParamNode {
  @Input() config: any;
  taxonomyParams = [{field: 'standardCategory.id', value: 3}];
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() stateChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() standardChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() textValueChange: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};
  constructor(private dataService: DataService, private mainService: MainService) {
  }

  ngOnInit() {
    if (!this.config.data.value.propertyType) {
      this.config.data.value.propertyType = this.dataService.propertyType.find(item => item.id == 1);
    }
  }

  onValueChanged(event) {
    this.config.data.value.value = event.target.value;
    this.valueChange.emit({val: event.target.value, value: this.config});
  }

  onTextValueChanged(event) {
    this.config.data.value.textValue = event.target.value;
    this.textValueChange.emit({val: event.target.value, value: this.config});
  }

  onStandardChanged(standard) {
    this.config.data.value.standard = standard;
    this.standardChange.emit({standard: standard, value: this.config});
  }

  onCheckChange(event) {
    if (event.checked) {
      this.selectTillRoot(this.config);
    } else {
      this.deselectAllChildren(this.config);
    }
    this.stateChange.emit({checked: event.checked, value: this.config});
  }

  selectTillRoot(node) {
    node.data.checked = true;
    if (!node.parent.data.virtual) {
      this.selectTillRoot(node.parent);
    }
  }

  deselectAllChildren(node) {
    node.data.checked = false;
    if (node.children) {
      node.children.forEach(child => {
        this.deselectAllChildren(child);
      });
    }
  }

  getPropertyUnit() {
    if (this.config.data.value.applicationResearch.goodsCategoryProperty.unit) {
      return this.config.data.value.applicationResearch.goodsCategoryProperty.unit.nameRu;
    } else {
      return '';
    }
  }

  getPropertyName() {
    if (this.config.data.value.applicationResearch.goodsCategoryProperty) {
      return this.config.data.value.applicationResearch.goodsCategoryProperty.name;
    } else {
      return '';
    }
  }

  isToggleVisible(node) {
    return node.parent.data.virtual;
  }

  onStateChanged(propertyType) {
    this.config.data.value.propertyType = propertyType;
    if (this.config.hasChildren) {
    this.config.children.forEach(item => {
      this.updateChildrenState(item, propertyType);
    });
    }
  }

  updateChildrenState(node, propertyType) {
    node.data.value.propertyType = propertyType;
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
