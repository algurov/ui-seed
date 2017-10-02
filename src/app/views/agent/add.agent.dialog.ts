import { Component, Inject, Input } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'agent-dlg',
  templateUrl: 'add.agent.dialog.html',
})
export class AddAgentDialog {
  constructor(
    private stringService: StringService,
    public dialogRef: MdDialogRef<AddAgentDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
