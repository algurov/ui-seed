import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'editable-field',
  templateUrl: './editable.field.html',
  styleUrls: ['./editable.field.scss']
})
export class EditableField {
  edit: boolean = false;
  @Input() value: any;
  @ViewChild('field') field: any;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  enterEditMode() {
    this.edit = true;
  }

  saveAction() {
    this.edit = false;
    this.update.emit(this.value);
  }

  discardAction() {
    this.field.nativeElement.value = this.value;
    this.edit = false;
  }
}
