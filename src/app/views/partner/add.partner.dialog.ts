import { Component, Inject, Input } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'agent-dlg',
  templateUrl: 'add.partner.dialog.html',
})
export class AddPartnerDialog {
  @Input() partner;
  dialog: MdDialogRef<AddPartnerDialog>;
  constructor(
    private stringService: StringService,
    public dialogRef: MdDialogRef<AddPartnerDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef; }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
