import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MessageDialogComponent } from '../widgets/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialog } from '../widgets/confirm.dialog';
import { MatSnackBar } from '@angular/material';
import { AddPartnerDialog } from '../views/partner/add.partner.dialog';
import { AddTaxonomyDialog } from '../views/taxonomy/add.taxonomy.dialog';
import { SelectTaxonomyDialog } from '../views/taxonomy/select/select.taxonomy.dialog';
import { SelectBranchDialog } from '../views/main/select.branch.dialog/select.branch.dialog';
import { SignDialog } from '../views/sign/sign.dialog';
import { CertificateTypeDialog } from '../views/document/certificate/type.dialog/type.dialog';
import { AnalysisTypeDialog } from '../views/document/analysis/type.dialog/analysis.type.dialog';
@Injectable()
export class DialogService {
  block: boolean = false;
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) {
  }
  showBlocker() {
    this.block = true;
  }
  hideBlocker() {
    this.block = false;
  }
  showMessageDlg(title: string, message: string) {
    let dlg = this.dialog.open(MessageDialogComponent);
    let cmp = dlg.componentInstance;
    cmp.title = title;
    cmp.message = message;
  }

  showSignDialog(docId, docType) {
   let dlg = this.dialog.open(SignDialog);
   let cmp = dlg.componentInstance;
   cmp.docId = docId;
   cmp.docType = docType;
   dlg.afterClosed().subscribe(res => {
     if(res) {
       this.showNotification('Документ подписан');
     }
   })
  }

  showAddAgentDialog() {
     let dlg = this.dialog.open(AddPartnerDialog);
     let cmp = dlg.componentInstance;
  }

  showEditAgentDialog(partner) {
    let dlg = this.dialog.open(AddPartnerDialog);
    let cmp = dlg.componentInstance;
    cmp.partner = partner;
  }

  showEditTaxonomyDialog(taxonomy, taxonomyName) {
    let dlg = this.dialog.open(AddTaxonomyDialog);
    let cmp = dlg.componentInstance;
    cmp.taxonomy = taxonomy;
    cmp.taxonomyName = taxonomyName;
  }

  showSelectTaxonomyDialog(taxonomy) {
    let dlg = this.dialog.open(SelectTaxonomyDialog);
    let cmp = dlg.componentInstance;
    cmp.taxonomy = taxonomy;
  }

  showNotification(message: string) {
     this.snackBar.open(message, '', {
      duration: 2000,
    });

  }
  showCertificateType() : Observable<number> {
    let dialogRef: MatDialogRef<CertificateTypeDialog>;
        dialogRef = this.dialog.open(CertificateTypeDialog);
        return dialogRef.afterClosed();
  }

  showAnalysisCardType() : Observable<number> {
    let dialogRef: MatDialogRef<AnalysisTypeDialog>;
        dialogRef = this.dialog.open(AnalysisTypeDialog);
        return dialogRef.afterClosed();
  }

  showConfirm(title: string, message: string) : Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
  }

  showSelectBranchDialog() {
    let dlg = this.dialog.open(SelectBranchDialog);
  }
}
