import { Component, Input } from '@angular/core';

@Component({
  selector: 'act-contactor',
  templateUrl: './act.contactor.component.html',
  styleUrls: ['./act.contactor.component.scss']
})
export class ActContactorComponent {
  @Input() data;
  agents = [];
  constructor(){
  }
  addItem() {
    if (!this.data.agents) {
      this.data.agents = [];
    }
    this.data.agents.push({guid: this.data.agents.length});
  }

  removeItem(item) {
    let index = this.data.agents.findIndex(it => it.guid == item.guid);
    this.data.agents.splice(index, 1);
  }
}
