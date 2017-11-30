import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { DataService } from '../../../../services/data.service';
import { Location } from '../../../../models/location';
@Component({
  selector: 'protocol-title',
  templateUrl: './protocol.title.component.html',
  styleUrls: ['./protocol.title.component.scss']
})
export class ProtocolTitleComponent {
  @Input() data: any;
  @Input() act: any;
  @Input() application: any;
  @Output() loaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  date: any;
  subscription: any;
  laboratoryVisible: boolean = false;
  partnerVisible: boolean = false;
  goodsVisible: boolean = false;
  constructor(private stringService: StringService, private mainService: MainService,
    private dataService: DataService) {
    this.subscription = this.mainService.protocolLoaded.subscribe(item => {
      if (item.date) {
        this.date = new Date(item.date);
      }
      this.loaded.emit(true);
    });
  }

  toggleLaboratoryVisibility() {
    this.laboratoryVisible = !this.laboratoryVisible;
  }

  togglePartnerVisibility() {
    this.partnerVisible = !this.partnerVisible;
  }

  toggleGoodsVisibility() {
    this.goodsVisible = !this.goodsVisible;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.date) {
        this.date = new Date(this.data.date);
      }
  }

  getDate(date) {
    return this.dataService.convertDate(new Date(date));
  }
  onLaboratoryChange(lab) {
    this.data.laboratory = lab;
  }

  getManufacturersLocations() {
    let result = '';
    let application = null;
    if (this.data.application) {
      application = this.data.application;
    }
    if (this.application) {
      application = this.application;
    }
    if (application) {
      if (application.manufacturers.length > 0) {
        application.manufacturers.forEach(manufacturer => {
          if (manufacturer.location) {
            let loc = new Location().deserialize(manufacturer.location);
            result += loc.getTitle();
          }
        });
      } else {
        return result;
      }
    } else {
      return result;
    }
    return result;
  }
  onDateChange(event) {
    this.date = event.value;
    this.data.date = event.value.getTime();
  }

  getApplicationTitle() {
    if (this.data.application) {
      return this.data.application.number;
    }
    if (this.application) {
      return this.application.number;
    }
    return '';
  }

  getLaboratoryName() {
    if (this.data.act) {
      return this.data.act.laboratory.name;
    }
    if (this.act) {
        return this.act.laboratory.name;
    }
    return '';
  }

  getLaboratoryCertificateNumber() {
    if (this.data.act) {
      return this.data.act.laboratory.numberCertificateAccreditation;
    }
    if (this.act) {
        return this.act.laboratory.numberCertificateAccreditation;
    }
    return '';
  }

  getLaboratoryRegistrationNumber() {
    if (this.data.act) {
      return this.data.act.laboratory.registrationNumber;
    }
    if (this.act) {
        return this.act.laboratory.registrationNumber;
    }
    return '';
  }

  getLaboratoryContact() {
    if (this.data.act) {
      return this.data.act.laboratory.contact;
    }
    if (this.act) {
        return this.act.laboratory.contact;
    }
    return '';
  }

  getApplicantName() {
    if (this.data.application) {
      return this.data.application.applicant.name;
    }
    if (this.application) {
      return this.application.applicant.name;
    }
    return '';
  }

  getApplicantAddress() {
    if (this.data.application) {
      return this.data.application.applicant.address;
    }
    if (this.application) {
      return this.application.applicant.address;
    }
    return '';
  }

  getGoodsName() {
    if (this.data.application) {
      return this.data.application.goods.fullNameRu;
    }
    if (this.application) {
      return this.application.goods.fullNameRu;
    }
    return '';
  }

  getAuthorizedPersonName() {
    if (this.data.act) {
      return this.data.act.authorizedPersonName;
    }
    if (this.act) {
        return this.act.authorizedPersonName;
    }
    return '';
  }

  getSampleNumber() {
    if (this.data.act) {
      return this.data.act.sampleNumber;
    }
    if (this.act) {
        return this.act.sampleNumber;
    }
    return '';
  }

  getActDate() {
    if (this.data.act) {
      return this.data.act.actDate;
    }
    if (this.act) {
        return this.act.actDate;
    }
    return '';
  }

  getActReceiptDate() {
    if (this.data.act) {
      return this.data.act.receiptDate;
    }
    if (this.act) {
        return this.act.receiptDate;
    }
    return '';
  }

  getSampleMass() {
    if (this.data.act) {
      return this.data.act.sampleMass;
    }
    if (this.act) {
        return this.act.sampleMass;
    }
    return '';
  }
}
