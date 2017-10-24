import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-reciver',
  templateUrl: './application.reciver.component.html',
  styleUrls: ['./application.reciver.component.scss']
})
export class ApplicationReciverComponent {
  @Input() data;

  constructor(private stringService: StringService) {}
}
