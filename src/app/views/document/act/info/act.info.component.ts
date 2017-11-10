import { Component, Input } from '@angular/core';

@Component({
  selector: 'act-info',
  templateUrl: './act.info.component.html',
  styleUrls: ['./act.info.component.scss']
})
export class ActInfoComponent {
  @Input() data: any;
}
