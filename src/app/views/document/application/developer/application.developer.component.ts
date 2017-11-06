import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-developer',
  templateUrl: './application.developer.component.html',
  styleUrls: ['./application.developer.component.scss']
})
export class ApplicationDeveloperComponent {
  @Input() data;
  developers = [];
  constructor(private stringService: StringService){
  }
  addItem() {
    if (!this.data.manufacturers) {
      this.data.manufacturers = [];
    }
    this.data.manufacturers.push({guid: this.data.manufacturers.length});
  }

  onPartnerChange(guid, partner) {
    let index = this.data.manufacturers.findIndex(it => it.guid == guid);
    this.data.manufacturers[index].partner = partner;
  }

  onLocationChange(guid, location) {
    let index = this.data.manufacturers.findIndex(it => it.guid == guid);
    this.data.manufacturers[index].location = location;
  }

  removeItem(item) {
    let index = this.data.manufacturers.findIndex(it => it.guid == item.guid);
    this.data.manufacturers.splice(index, 1);
  }
}
