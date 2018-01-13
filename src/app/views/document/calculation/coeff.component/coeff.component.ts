import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'coeff',
  templateUrl: './coeff.component.html',
  styleUrls: ['./coeff.component.scss']
})
export class CoeffComponent {
  @Input() data;
  @Input() number;
  right: boolean;
  coeff: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    console.log(this.data);
    this.coeff = this.data.coefficient;
  }

  isRight() {
      this.right = true;
  }

  remove() {
    this.onDelete.emit(this.data);
  }

  onCoeffChange(event) {
    if (+event.target.value < this.data.coefficient) {
      this.coeff = this.data.coefficient;
      event.target.value = this.data.coefficient;
    } else {
      this.coeff = +event.target.value;
    }
    console.log(this.coeff);
    this.isRight();
  }

}
