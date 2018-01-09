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
    this.coeff = +event.target.value;
    console.log(this.coeff);
    //this.calculateTotal();
    this.isRight();
  }

  onCountChange(event) {
    this.data.amount = +event.target.value;
    this.calculateTotal();
  }

  calculateTotal() {
    this.data.orderPrice = this.data.amount * this.data.price * this.data.coefficient;
  }

}
