import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';

@Component({
    selector: 'type-dialog',
    templateUrl: './type.dialog.html',
    styleUrls: ['./type.dialog.scss']
})
export class CertificateTypeDialog {
  types = [];
    constructor(public dialogRef: MatDialogRef<CertificateTypeDialog>, private documentService: DocumentService) {
      this.documentService.getCertificateTypeList().subscribe(res => {
        this.types = res.content;
      });
    }
}
