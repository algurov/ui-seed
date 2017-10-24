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
  constructor(private stringService: StringService){}

  addItem() {
    this.developers.push({id: this.developers.length});
  }

  removeItem(item) {
    let index = this.developers.findIndex(it => it.id == item.id);
    this.developers.splice(index, 1);
  }
}
