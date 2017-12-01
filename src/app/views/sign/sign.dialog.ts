import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DocumentService } from '../../services/document.service';
//import { DialogService } from '../../services/dialog.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'sign-dlg',
  templateUrl: './sign.dialog.html',
  styleUrls: ['./sign.dialog.scss']
})
export class SignDialog {
  form : FormGroup;
  @Input() docId: any;
  @Input() docType: any;
  signerName: any;
  date: any;
  dialog: MatDialogRef<SignDialog>;
  positionList: Array<any> = new Array<any>();
  roleList: Array<any> = new Array<any>();
  role: any;
  position: any;
  organization: '';
  user: any;
  comment: any;
  constructor(
    //private dialogService: DialogService,
    private fb: FormBuilder,
    private documentService: DocumentService,
    private userService: UserService,
    private authService: AuthService,
    private stringService: StringService,
    public dialogRef: MatDialogRef<SignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        signerName: ['', Validators.required],
        date: [''],
        position: ['', Validators.required],
        role: ['', Validators.required],
        organization: [''],
        comment: ['']
      });
      this.dialog = dialogRef;
      this.form.get('signerName').setValue(this.authService.getLoggedIn().userFamilyName + ' ' + this.authService.getLoggedIn().userGivenName[0]+'. '+ this.authService.getLoggedIn().userSecondName[0]+'.');
      this.date = new Date();
      this.form.get('date').setValue(this.date);
      this.userService.getUserByIdFull(this.authService.getLoggedIn().id).subscribe(res => {
        this.user = res;
        console.log(this.user);
        this.positionList = this.user.positions;
        this.roleList = this.user.roles;
        this.form.get('role').setValue(this.roleList[0].id);
        this.form.get('position').setValue(this.positionList[0].name);
        if (this.user.branchOffice) {
            this.organization = this.user.branchOffice.name;
        }
        this.form.get('organization').setValue(this.organization);
      });
    }

  submitAction() {
    if(this.form.valid) {
      let toSend = {
        documentId: this.docId,
        signerName: this.form.value.signerName,
        branchOffice: this.form.value.organization,
        signerRoleId: this.form.value.role,
        signerPosition: this.form.value.position,
        documentType: this.docType,
        comment: this.form.value.comment
      };
      console.log(toSend);
      this.documentService.signDocument(toSend).subscribe(res => {
          this.dialogRef.close(true);
      });
    }

    }


}
