import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'role-dlg',
  templateUrl: 'role.add.dialog.html',
  styleUrls: ['./role.add.dialog.scss']
})
export class RoleAddDialog {
  //name: string;
  form: FormGroup;
  dialog: MatDialogRef<RoleAddDialog>;
  constructor(
    private fb: FormBuilder,
    private stringService: StringService,
    public dialogRef: MatDialogRef<RoleAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        name: ['', Validators.required]
      });
    this.dialog = dialogRef;

  }

  submit(): void {
    if(this.form.valid) {
      this.dialogRef.close(this.form.get('name').value);
    }
  }

}
