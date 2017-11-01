import { Component, Input} from '@angular/core';
import { StringService } from '../../../../services/string.service';

@Component({
  selector: 'application-applicant',
  templateUrl: 'application.applicant.component.html',
  styleUrls: ['./application.applicant.component.scss']
})
export class ApplicationApplicantComponent {
  @Input() data;
  sameOwner: any;
  sameReciver: any;
  visible: boolean = false;
  constructor(private stringService: StringService) {}

  toggleVisibility() {
    this.visible = !this.visible;
  }
  ngOnInit() {
    if (this.data.applicant) {
      if (this.data.owner) {
        if (this.data.applicant.id != this.data.owner.id) {
          this.sameOwner = false;
        } else {
          this.sameOwner = true;
        }
      } else {
        this.sameOwner = true;
        this.data.owner = this.data.applicant;
      }
      if (this.data.documentsReceiver) {
        if (this.data.applicant.id != this.data.documentsReceiver.id) {
          this.sameReciver = false;
        } else {
          this.sameReciver = true;
        }
      } else {
        this.sameReciver = true;
        this.data.documentsReceiver = this.data.applicant;
      }
    } else {
      this.sameOwner = true;
      this.sameReciver = true;
    }
  }

  changeApplicant(event) {
    this.data.applicant = event;
    if (this.sameOwner) {
      this.data.owner = this.data.applicant;
    }
    if (this.sameReciver) {
      this.data.documentsReceiver = this.data.applicant;
    }
  }

  changeOwner(event) {
    this.data.owner = event;
  }

  changeReciver(event) {
    this.data.documentsReceiver = event;
  }
  sameOwnerChange(event) {
    this.sameOwner = event.checked;
    if (this.sameOwner) {
      if (this.data.applicant) {
        this.data.owner = this.data.applicant;
      }
    }

    console.log(this.data);
  }

  sameReciverChange(event) {
    this.sameReciver = event.checked;
    if (this.sameReciver){
      if (this.data.applicant) {
        this.data.documentsReceiver = this.data.applicant;
      }
    }

    console.log(this.data);
  }

  ngAfterViewInit() {

    // console.log(this.data.applicant);
    // if (this.sameOwner) {
    //   this.data.owner = this.data.applicant;
    // }
    // if (this.sameReciver) {
    //   this.data.reciver = this.data.applicant;
    // }
  }
}
