import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MainService } from '../../../../services/main.service';
import { TreeComponent } from 'angular2-tree-component';
@Component({
  selector: 'kernel-node',
  templateUrl: './kernel.node.html',
  styleUrls: ['./kernel.node.scss']
})
export class KernelNode {
  @Input() config: any;
  //@Input() isInsect: boolean;
  @Input() tree: TreeComponent;
  @Input() portion;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};
  value: number = null;
  additionalFirst: number = null;
  additionalSecond: number = null;
  //coefficient: Array<any>;
  //selectedCoef: any;
  //ekz: any;
  //spz: any;

  constructor(private dataService: DataService, private mainService: MainService) {

  }

  ngOnChanges(changes) {
    this.init();
  }

  ngOnInit() {

    this.init();
  }

  init() {

      this.value = this.config.data.doubleValue;
      if (this.config.data.additionalAnalysisCardPropertyValues[0]) {
        this.additionalFirst = this.config.data.additionalAnalysisCardPropertyValues[0].doubleValue;
      }
      if (this.config.data.additionalAnalysisCardPropertyValues[1]) {
        this.additionalSecond = this.config.data.additionalAnalysisCardPropertyValues[1].doubleValue;
      }
  }

  onValueChanged(event) {
    this.value = event.target.value;
    this.config.data.doubleValue = this.value;
    //this.valueChange.emit({val: event.target.value, value: this.config});
  }

  calculateValue() {
    if (this.additionalFirst && this.portion) {
      return (+this.additionalFirst/+this.portion) * 100;
    }
  }

  // updateParentValue() {
  //   if (this.config.parent) {
  //     if (!this.config.parent.data.virtual) {
  //       this.config.parent.data.doubleValue = this.config.parent.data.doubleValue + this.value;
  //     }
  //   }
  // }

  onFirstValueChanged(event) {
    this.additionalFirst = event.target.value;
    this.value = this.calculateValue();
    //this.updateParentValue();

    this.config.data.doubleValue = this.value;
    this.config.data.additionalAnalysisCardPropertyValues[0].doubleValue = this.additionalFirst;
    this.dataChange.emit({value:this.config});
  }

  onSecondValueChanged(event) {
    this.additionalSecond = event.target.value;
    //this.value = this.calculateValue();
    //this.updateParentValue();
    //this.config.data.doubleValue = this.value;
    this.config.data.additionalAnalysisCardPropertyValues[1].doubleValue = this.additionalSecond;
    this.dataChange.emit({value:this.config});
  }

  getPropertyUnit() {
    if (this.config.data.property) {
      if (this.config.data.property.units[0]) {
        if (this.config.data.property.units[0].nameRu) {
          return this.config.data.property.units[0].nameRu;
        }
      }
    }
  }

  getPropertyName() {
    if (this.config.data.property) {
      return this.config.data.property.nameRu
    }
  }

  isInputVisible(node) {
    if (node.parent.data.virtual) {
      return false;
    }
    return node.children.length == 0;
  }

  removeItem() {
    this.onRemove.emit({node : this.config});
  }

}
