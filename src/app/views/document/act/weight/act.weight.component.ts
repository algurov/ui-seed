import { Component, Input } from '@angular/core';

@Component({
  selector: 'act-weight',
  templateUrl: './act.weight.component.html',
  styleUrls: ['./act.weight.component.scss']
})
export class ActWeightComponent {
  @Input() data: any;
}
