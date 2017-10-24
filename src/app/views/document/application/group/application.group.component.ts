import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-group',
  templateUrl: './application.group.component.html',
  styleUrls: ['./application.group.component.scss']
})
export class ApplicationGroupComponent {
  @Input() data;
  constructor(private stringService: StringService) {}
}
