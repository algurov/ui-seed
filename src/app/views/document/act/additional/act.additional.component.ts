import { Component, Input } from '@angular/core';

@Component({
  selector: 'act-additional',
  templateUrl: './act.additional.component.html',
  styleUrls: ['./act.additional.component.scss']
})
export class ActAdditionalComponent {
  @Input() data: any;
}
