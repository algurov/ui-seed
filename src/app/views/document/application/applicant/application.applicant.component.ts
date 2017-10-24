import { Component, Input} from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-applicant',
  templateUrl: 'application.applicant.component.html',
  styleUrls: ['./application.applicant.component.scss']
})
export class ApplicationApplicantComponent {
  @Input() data;
  sameOwner = false;
  sameReciver = false;
  constructor(private stringService: StringService) {}

  changeApplicant(event) {
    this.data.applicant = event;
    if (this.sameOwner) {
      this.data.owner = this.data.applicant;
    }
    if (this.sameReciver) {
      this.data.reciver = this.data.applicant;
    }
  }

  sameOwnerChange(event) {
    this.sameOwner = event.checked;
    if (this.data.applicant) {
      this.data.owner = this.data.applicant;
    }
    console.log(this.data);
  }

  sameReciverChange(event) {
    this.sameReciver = event.checked;
    if (this.data.applicant) {
      this.data.reciver = this.data.applicant;
    }
    console.log(this.data);
  }
}
