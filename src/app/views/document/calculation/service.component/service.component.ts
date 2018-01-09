import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  @Input() data;
  @Input() number;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    console.log(this.data);
  }

  remove() {
    this.onDelete.emit(this.data);
  }
  
  onCoeffChange(event) {
    this.data.coefficient = +event.target.value;
    this.calculateTotal();
  }

  onCountChange(event) {
    this.data.amount = +event.target.value;
    this.calculateTotal();
  }

  calculateTotal() {
    this.data.orderPrice = this.data.amount * this.data.price * this.data.coefficient;
  }

}
