import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'color-toggle',
  templateUrl: './color.toggle.component.html',
  styleUrls: ['./color.toggle.component.scss']
})
export class ColorToggleComponent {
  @Input() value: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dataService: DataService) {}
  getActiveColor() {
    if (!this.value) {
      this.value = this.dataService.propertyType.find(item => item.id == 1);
    }
    if (this.value.id == 1) {
      return 'green';
    } else {
      return 'blue';
    }
  }

  toggleState() {
    if (this.value.id == 1) {
      this.value = this.dataService.propertyType.find(item => item.id == 2);
    } else {
      this.value = this.dataService.propertyType.find(item => item.id == 1);
    }
    this.onChange.emit(this.value);
  }
}
