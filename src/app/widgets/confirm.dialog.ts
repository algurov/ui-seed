import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm.dialog.html',
    styleUrls: ['./confirm.dialog.scss']
})
export class ConfirmDialog {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {

    }
}
