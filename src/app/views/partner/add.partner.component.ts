import { Component, Input } from '@angular/core';
import { StringService } from '../../services/string.service';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Partner } from '../../models/partner';
import { PartnerService } from '../../services/partner.service';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { AddPartnerDialog } from './add.partner.dialog';
import { MainService } from '../../services/main.service';
import { DialogService } from '../../services/dialog.service';


@Component({
  selector: 'add-agent',
  templateUrl: './add.partner.component.html',
  styleUrls: ['./add.partner.component.scss']
})
export class AddPartnerComponent {
  @Input() dialog: MdDialogRef<AddPartnerDialog>;
  @Input() partner;
  partnerForm: FormGroup;
  collapsed: boolean = true;
  types = [{title: 'Юридическое лицо', value: 'ORZANIZATION'}, {title: 'Физическое лицо', value: 'PERSON'}];
  docTypes = [{title: 'ИНН', value: 'INN'}, {title: 'Другое', value: 'OTHER'}];
  constructor(private stringService: StringService, private fb: FormBuilder,
      private partnerService: PartnerService, public mainService: MainService,
      private dlgService: DialogService) {
    this.partnerForm = this.fb.group({
      partnerType: [''],
      documentType: [''],
      documentNumber: [''],
      documentIssued: [''],
      name: [''],
      address: [''],
      contactPhones: [''],
      fax: [''],
      id: ['']
    });

  }
  ngAfterContentInit() {
    if (this.partner) {
      this.collapsed = false;
      this.partnerForm.setValue(this.partner);
    }
  }
  toggleView() {
    this.collapsed = !this.collapsed;
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
