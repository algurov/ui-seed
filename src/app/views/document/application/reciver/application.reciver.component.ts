import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'application-reciver',
  templateUrl: './application.reciver.component.html',
  styleUrls: ['./application.reciver.component.scss']
})
export class ApplicationReciverComponent {
  @Input() data;
  sender: any;
  senderLocation: any;
  senderComment: any;
  reciver: any;
  reciverLocation: any;
  reciverComment: any;

  constructor(private stringService: StringService, private mainService: MainService) {
    this.mainService.applicationLoaded.subscribe(item => {
      if (item.cargoSender) {
        this.sender = item.cargoSender.partnerDto;
        this.senderLocation = item.cargoSender.location;
        this.senderComment = item.cargoSender.comment;
      }
      if (item.cargoReceiver) {
        this.reciver = item.cargoReceiver.partnerDto;
        this.reciverLocation = item.cargoReceiver.location;
        this.reciverComment = item.cargoReceiver.comment;
      }
    });
  }

  onCargoSenderPartnerChange(partner) {
    this.sender = partner;
    if (!this.data.cargoSender) {
      this.data.cargoSender = {};
    }
    this.data.cargoSender.partnerDto = partner;
  }

  onCargoSenderLocationChange(location) {
    this.senderLocation = location;
    if (!this.data.cargoSender) {
      this.data.cargoSender = {};
    }
    this.data.cargoSender.location = location;
  }

  onCargoSenderCommentChange(event) {
      this.senderComment = event.target.value;
      if (!this.data.cargoSender) {
        this.data.cargoSender = {};
      }
      this.data.cargoSender.comment = event.target.value;
  }

  onCargoReceiverPartnerChange(partner) {
    this.reciver = partner;
    if (!this.data.cargoReceiver) {
      this.data.cargoReceiver = {};
    }
    this.data.cargoReceiver.partnerDto = partner;
  }

  onCargoReceiverLocationChange(location) {
    this.reciverLocation = location;
    if (!this.data.cargoReceiver) {
      this.data.cargoReceiver = {};
    }
    this.data.cargoReceiver.location = location;
  }

  onCargoReceiverCommentChange(event) {
      this.reciverComment = event.target.value;
      if (!this.data.cargoReceiver) {
        this.data.cargoReceiver = {};
      }
      this.data.cargoReceiver.comment = event.target.value;
  }

  ngOnInit() {
    if (this.data.cargoSender) {
      this.sender = this.data.cargoSender.partnerDto;
      this.senderLocation = this.data.cargoSender.location;
      this.senderComment = this.data.cargoSender.comment;
    }
    if (this.data.cargoReceiver) {
      this.reciver = this.data.cargoReceiver.partnerDto;
      this.reciverLocation = this.data.cargoReceiver.location;
      this.reciverComment = this.data.cargoReceiver.comment;
    }
  }
}
