import { Component, Input } from '@angular/core';

@Component({
  selector: 'act-quality',
  templateUrl: './act.quality.component.html',
  styleUrls: ['./act.quality.component.scss']
})
export class ActQualityComponent {
  @Input() data: any;
}
