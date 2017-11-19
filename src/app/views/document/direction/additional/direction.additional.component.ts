import { Component, Input } from '@angular/core';

@Component({
  selector: 'direction-additional',
  templateUrl: './direction.additional.component.html',
  styleUrls: ['./direction.additional.component.scss']
})
export class DirectionAdditionalComponent {
  @Input() data: any;
}
