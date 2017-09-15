import { Injectable } from '@angular/core';
import { MessageDialogComponent } from '../widgets/message-dialog/message-dialog.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
}
