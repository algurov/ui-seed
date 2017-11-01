import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MessageDialogComponent } from '../widgets/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialog } from '../widgets/confirm.dialog';
import { MatSnackBar } from '@angular/material';
import { AddPartnerDialog } from '../views/partner/add.partner.dialog';
import { AddTaxonomyDialog } from '../views/taxonomy/add.taxonomy.dialog';
import { SelectTaxonomyDialog } from '../views/taxonomy/select/select.taxonomy.dialog';

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
  showConfirm(title: string, message: string) : Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
  }
}
