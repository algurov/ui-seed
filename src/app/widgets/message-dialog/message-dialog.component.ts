import { Component, Inject, Input } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'messge-dlg',
  templateUrl: 'message-dialog.component.html',
})
export class MessageDialogComponent {
  @Input() title: string;
  @Input() message: string;
  constructor(
    public dialogRef: MdDialogRef<MessageDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
