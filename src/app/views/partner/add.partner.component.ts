import { Component, Input } from '@angular/core';
import { StringService } from '../../services/string.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Partner } from '../../models/partner';
import { PartnerService } from '../../services/partner.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AddPartnerDialog } from './add.partner.dialog';
import { MainService } from '../../services/main.service';
import { DialogService } from '../../services/dialog.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'add-agent',
  templateUrl: './add.partner.component.html',
  styleUrls: ['./add.partner.component.scss']
})
export class AddPartnerComponent {
  @Input() dialog: MatDialogRef<AddPartnerDialog>;
  @Input() partner;
  partnerForm: FormGroup;
  showNotification: boolean = false;
  collapsed: boolean = true;
  types : any;//= [{title: 'Юридическое лицо', value: 'ORGANIZATION'}, {title: 'Физическое лицо', value: 'PERSON'}];
  docTypes : any;// = [{title: 'ИНН', value: 'INN'}, {title: 'Паспорт', value: 'PASSPORT'}];
  constructor(private stringService: StringService, private fb: FormBuilder,
      private partnerService: PartnerService, public mainService: MainService,
      private dlgService: DialogService, public dataService: DataService) {
    this.types = dataService.getPartnerTypes();
    this.docTypes = dataService.getPartnerDocumentTypes();
    this.partnerForm = this.fb.group({
      partnerType: [''],
      documentType: [''],
      documentNumber: [''],
      documentIssued: [''],
      name: [''],
      address: [''],
      contactPhones: [''],
      fax: [''],
      id: [''],
      version: ['']
    });

  }
  ngAfterContentInit() {
    if (this.partner) {
      this.collapsed = false;
      this.partnerForm.setValue(this.partner);
    }
  }
  toggleView() {
    if (this.partnerForm.get('documentNumber').value == '') {
      this.collapsed = !this.collapsed;
      return;
    }
    this.partnerService.getPartnerByDocumentNumber(this.partnerForm.get('documentNumber').value).subscribe(res => {
      if(res.numberOfElements > 0) {
        this.showNotification = true;
      } else {
        this.showNotification = false;
        this.collapsed = !this.collapsed;
      }
    });
    //this.collapsed = !this.collapsed;
  }

  submitAction() {
    if (this.partnerForm.valid) {
      this.dlgService.block = true;
      let partnerToSend = new Partner().deserialize(this.partnerForm.value);
    if (this.partner) {
        this.partnerService.updatePartner(partnerToSend).subscribe(res=>{
          this.dlgService.block = false;
          this.dialog.close();
          this.mainService.partnerUpdated.emit(res);

        });
      } else {
        this.partnerService.createPartner(partnerToSend).subscribe(res=>{
          this.dlgService.block = false;
          this.dialog.close();
          this.mainService.partnerAdded.emit(res);
        });
      }

    }
  }
}
