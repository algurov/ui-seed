import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { StringService } from '../../services/string.service';

const COMMA = 188;
const ENTER = 13;
/**
 * @title Chips with input
 */
@Component({
  selector: 'input-chips',
  templateUrl: './chips.input.html',
  styleUrls: ['./chips.input.scss']
})
export class ChipsInput {
  @Input() items : Array<any>;
  @Input('title') title: string;
  @Output() onRemove = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  // Enter, comma
  separatorKeysCodes = [COMMA, ENTER];

  constructor(public stringService: StringService){}
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    console.log(this.items);
    // Add our person
    if ((value || '').trim()) {
      this.items.push(value.trim());
      this.onAdd.emit(this.items);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  getTitle() {
    return this.stringService.get(this.title);
  }
  remove(item: any): void {
    let index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
      this.onRemove.emit(this.items);
    }
  }
}
