import { Component } from '@angular/core';
import { StringService } from '../../../services/string.service';

@Component({
  selector: 'calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent {
  constructor(private stringService: StringService){}
  data = {};
}
