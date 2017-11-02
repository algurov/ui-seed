import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'product-field',
  templateUrl: './product.field.html',
  styleUrls: ['./product.field.scss']
})
export class ProductField {
  @Input() standard: any;
  @Input() node: any;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dataService: DataService) {

  }
  ngOnInit() {
    if (!this.node.data.propertyType) {
      this.node.data.propertyType = this.dataService.propertyType.find(item => item.id == this.standard.standardCategory.id )
    }
  }
  isToggleVisible() {
    return this.node.parent.data.virtual;
  }

  getTitleForNode() {
    if (this.node.data.property) {
      return this.node.data.property.nameRu;
    } else {
      return this.node.data.goodsCategoryProperty.name;
    }
  }

  removeItem() {
    this.onRemove.emit(this.node);
  }

  onStateChange(propertyType) {
    this.node.data.propertyType = propertyType;
    if (this.node.hasChildren) {
    this.node.children.forEach(item => {
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

}
