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
    //this.config.data.applicationResearch.name = this.config.data.applicationResearch.property.nameRu;
    if (!this.config.data.applicationResearch.option) {
      this.config.data.applicationResearch.option = 0;
    }
    console.log(this.config);
  }
  isToggleVisible(node) {
    return node.parent.data.virtual;
  }
  isValue() {
    if (this.config.data.applicationResearch.option == 0) {
      return true;
    }
    return false;
  }

  onOptionChange(event) {
    this.config.data.applicationResearch.option = event.value;
    switch (this.config.data.applicationResearch.option) {
      case 0: this.config.data.applicationResearch.text = ''; break;
      case -1: this.config.data.applicationResearch.text = 'Не допускается'; break;
      case 1: this.config.data.applicationResearch.text = 'Не ограничено'; break;
    }
  }
  onStateChanged(state) {
    this.config.data.applicationResearch.state = state;
    if (this.config.hasChildren) {
    this.config.children.forEach(item => {
      this.updateChildrenState(item, state);
    });
    }
  }

  updateChildrenState(node, state) {
    node.data.applicationResearch.state = state;
    if (node.hasChildren) {
    this.config.children.forEach(item => {
      this.updateChildrenState(item, state);
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
