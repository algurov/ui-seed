import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MainService } from '../../../../services/main.service';
@Component({
  selector: 'protocol-param-node',
  templateUrl: './protocol.param.node.html',
  styleUrls: ['./protocol.param.node.scss']
})
export class ProtocolParamNode {
  @Input() config: any;
  data: any = {};
  constructor(private dataService: DataService, private mainService: MainService) {
  }

  getPropertyUnit() {
    if (this.config.data.goodsCategoryProperty) {
      if (this.config.data.goodsCategoryProperty.unit) {
        return this.config.data.goodsCategoryProperty.unit.nameRu;
      } else {
        return '';
      }
    } else {
      if (this.config.data.property.units[0]) {
        return this.config.data.property.units[0].nameRu;
      } else {
        return '';
      }
    }
  }

  getPropertyName() {
    if (this.config.data.customName) {
      return this.config.data.customName;
    }
    if (this.config.data.goodsCategoryProperty) {
      return this.config.data.goodsCategoryProperty.name;
    } else {
      return this.config.data.property.nameRu;
    }
  }

  getMinMax() {
    let min = null;
    let max = null;
    if (this.config.data.minValue) {
      min = this.config.data.minValue;
    }
    if (this.config.data.maxValue) {
      max = this.config.data.maxValue;
    }
    if (min && max) {
      return min + ' - ' + max;
    }
    if (min && !max) {
      return 'не менее ' + min;
    }
    if (max && !min) {
      return 'не более ' + max;
    }
    return '-';
  }

  getStandardName() {
    if (this.config.data.standard) {
      return this.config.data.standard.shortName;
    }
    return '-';
  }

  getValue() {
    if (this.config.data.value) {
      return this.config.data.value;
    }
    return '-';
  }
  getWidth() {
    let base = 400;
    let step = 70;
    this.config.path.length
    return base - (this.config.path.length - 1) * step;
  }
  ngOnInit() {
  }
}
