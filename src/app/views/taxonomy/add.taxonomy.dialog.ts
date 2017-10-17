import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'taxonomy-dlg',
  templateUrl: 'add.taxonomy.dialog.html',
})
export class AddTaxonomyDialog {
  @Input() taxonomy;
  @Input() taxonomyName;
  dialog: MatDialogRef<AddTaxonomyDialog>;
  constructor(
    private stringService: StringService,
    public dialogRef: MatDialogRef<AddTaxonomyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef; }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
