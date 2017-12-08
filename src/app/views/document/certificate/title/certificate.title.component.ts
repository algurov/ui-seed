import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';

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
  constructor(private stringService: StringService, private mainService: MainService) {
    this.subscription = this.mainService.actLoaded.subscribe(item => {
      if (item.actDate) {
        this.date = new Date(item.actDate);
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
      if(this.data.actDate) {
        this.date = new Date(this.data.actDate);
      }
  }

  onDateChange(event) {
    this.date = event.value;
    this.data.actDate = event.value.getTime();
  }

  getLaboratoryName() {
    return 'Laboratory';
  }

  getLaboratoryCertificateNumber() {
    return '';
  }

  getLaboratoryRegistrationNumber() {
    return '';
  }

  getLaboratoryContact() {
    return '';
  }
}
