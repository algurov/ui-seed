import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { DataService } from '../../../../services/data.service';
@Component({
  selector: 'certificate-title',
  templateUrl: './certificate.title.component.html',
  styleUrls: ['./certificate.title.component.scss']
})
export class CertificateTitleComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  laboratoryVisible = true;
  constructor(private stringService: StringService, private mainService: MainService,
    private dataService: DataService) {
    this.subscription = this.mainService.certificateLoaded.subscribe(item => {
      this.data = item;
      if (item.createDate) {
        this.date = new Date(item.createDate);
      }
    });
  }

  toggleLaboratoryVisibility() {
    this.laboratoryVisible = !this.laboratoryVisible;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.createDate) {
        this.date = new Date(this.data.createDate);
      }
  }

  getCertificateTitle() {
    if (this.data.certificateType) {
      return this.data.certificateType.name;
    }
    return '';
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);
    this.data.createDate = this.date.getTime();
  }

  getLaboratoryName() {
    if (this.data.laboratory) {
        return this.data.laboratory.name;
    }
    return '';
  }

  getLaboratoryCertificateNumber() {
    if (this.data.laboratory) {
      return this.data.laboratory.numberCertificateAccreditation;
    }
    return '';
  }

  getLaboratoryRegistrationNumber() {
    if (this.data.laboratory) {
      return this.data.laboratory.registrationNumber;
    }
    return '';
  }

  getLaboratoryContact() {
    if (this.data.laboratory) {
      return this.data.laboratory.contact;
    }
    return '';
  }
}
