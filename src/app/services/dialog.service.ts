import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MessageDialogComponent } from '../widgets/message-dialog/message-dialog.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ConfirmDialog } from '../widgets/confirm.dialog';
@Injectable()
export class DialogService {

  constructor(public dialog: MdDialog) {
  }

  showMessageDlg(title: string, message: string) {
    let dlg = this.dialog.open(MessageDialogComponent);
    let cmp = dlg.componentInstance;
    cmp.title = title;
    cmp.message = message;
  }

  showConfirm(title: string, message: string) : Observable<boolean> {
    let dialogRef: MdDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
  }
}
