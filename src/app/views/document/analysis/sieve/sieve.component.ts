import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MainService } from '../../../../services/main.service';
import { TreeComponent } from 'angular2-tree-component';
@Component({
  selector: 'sieve',
  templateUrl: './sieve.component.html',
  styleUrls: ['./sieve.component.scss']
})
export class SieveComponent {
  @Input() data: any;
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  value: number = null;
  additionalFirst: number = null;
  additionalSecond: number = null;
  additionalText: string = '';

  constructor(private dataService: DataService, private mainService: MainService) {
  }

  ngOnInit() {
    this.init();
  }


  init() {

      this.value = this.data.doubleValue;
      if (this.data.additionalAnalysisCardPropertyValues[0]) {
        this.additionalFirst = this.data.additionalAnalysisCardPropertyValues[0].doubleValue;
      }
      if (this.data.additionalAnalysisCardPropertyValues[1]) {
        this.additionalSecond = this.data.additionalAnalysisCardPropertyValues[1].doubleValue;
      }
      if (this.data.additionalAnalysisCardPropertyValues[2]) {
        this.additionalText = this.data.additionalAnalysisCardPropertyValues[2].textValue;
      }
  }

  onValueChanged(event) {
    this.value = event.target.value;
    this.data.doubleValue = this.value;
    //this.valueChange.emit({val: event.target.value, value: this.config});
  }

  calculateValue() {
    if (this.additionalFirst && this.additionalSecond) {
      return (+this.additionalFirst/+this.additionalSecond) * 100;
    }
    // if (this.additionalFirst && !this.additionalSecond  && this.portion) {
    //   return (+this.additionalFirst/+this.portion) * 100;
    // }
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

    this.data.doubleValue = this.value;
    this.data.additionalAnalysisCardPropertyValues[0].doubleValue = this.additionalFirst;
    this.dataChange.emit({value:this.data});
  }

  onSecondValueChanged(event) {
    this.additionalSecond = event.target.value;
    this.value = this.calculateValue();
    //this.updateParentValue();
    this.data.doubleValue = this.value;
    this.data.additionalAnalysisCardPropertyValues[1].doubleValue = this.additionalSecond;
    this.dataChange.emit({value:this.data});
  }

  onTextChange(event) {
    this.additionalText = event.target.value;
    this.data.additionalAnalysisCardPropertyValues[2].textValue = this.additionalText;
    this.dataChange.emit({value:this.data});
  }

  getPropertyUnit() {
    if (this.data.property) {
      if (this.data.property.units[0]) {
        if (this.data.property.units[0].nameRu) {
          return this.data.property.units[0].nameRu;
        }
      }
    }
  }

  getPropertyName() {
    if (this.data.property) {
      return this.data.property.nameRu
    }
  }

  removeItem() {
    this.onRemove.emit({node : this.data});
  }

}
