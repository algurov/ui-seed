import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MessageDialogComponent } from '../widgets/message-dialog/message-dialog.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ConfirmDialog } from '../widgets/confirm.dialog';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class DialogService {
  block: boolean = false;
  constructor(public dialog: MdDialog, public snackBar: MdSnackBar) {
  }

  showMessageDlg(title: string, message: string) {
    let dlg = this.dialog.open(MessageDialogComponent);
    let cmp = dlg.componentInstance;
    cmp.title = title;
    cmp.message = message;
  }

  showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
  showConfirm(title: string, message: string) : Observable<boolean> {
    let dialogRef: MdDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
  }
}
