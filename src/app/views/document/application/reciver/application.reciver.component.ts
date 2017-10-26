import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-reciver',
  templateUrl: './application.reciver.component.html',
  styleUrls: ['./application.reciver.component.scss']
})
export class ApplicationReciverComponent {
  @Input() data;

  constructor(private stringService: StringService) {

  }

  onCargoSenderPartnerChange(partner) {
    this.data.cargoSender.partner = partner;
  }

  onCargoSenderLocationChange(location) {
    this.data.cargoSender.location = location;
  }

  onCargoReciverPartnerChange(partner) {
    this.data.cargoReciver.partner = partner;
  }

  onCargoReciverLocationChange(location) {
    this.data.cargoReciver.location = location;
  }

  ngOnInit() {
    if (!this.data.cargoSender) {
      this.data.cargoSender = {};
    }
    if (!this.data.cargoReciver) {
      this.data.cargoReciver = {};
    }
  }
}
