import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'agent-dlg',
  templateUrl: 'add.partner.dialog.html',
})
export class AddPartnerDialog {
  @Input() partner;
  dialog: MatDialogRef<AddPartnerDialog>;
  constructor(
    private stringService: StringService,
    public dialogRef: MatDialogRef<AddPartnerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef; }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
