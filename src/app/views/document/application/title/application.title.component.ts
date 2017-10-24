import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-title',
  templateUrl: './application.title.component.html',
  styleUrls: ['./application.title.component.scss']
})
export class ApplicationTitleComponent {
  @Input() data: any;

  constructor(private stringService: StringService) {}
}
