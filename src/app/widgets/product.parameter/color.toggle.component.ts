import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-toggle',
  templateUrl: './color.toggle.component.html',
  styleUrls: ['./color.toggle.component.scss']
})
export class ColorToggleComponent {
  @Input() value: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  getActiveColor() {
    if (this.value) {
      return 'green';
    } else {
      return 'blue';
    }
  }

  toggleState() {
    this.value = !this.value;
    this.onChange.emit(this.value);
  }
}
