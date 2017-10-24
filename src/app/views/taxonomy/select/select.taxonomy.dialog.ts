import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../../services/string.service';

@Component({
  selector: 'taxonomy-select-dlg',
  templateUrl: 'select.taxonomy.dialog.html',
})
export class SelectTaxonomyDialog {
  @Input() taxonomy;
  dialog: MatDialogRef<SelectTaxonomyDialog>;
  constructor(
    private stringService: StringService,
    public dialogRef: MatDialogRef<SelectTaxonomyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef; }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
