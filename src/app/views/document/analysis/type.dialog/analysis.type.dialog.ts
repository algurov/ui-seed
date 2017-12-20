import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { DocumentService } from '../../../../services/document.service';

@Component({
    selector: 'analysis-type-dialog',
    templateUrl: './analysis.type.dialog.html',
    styleUrls: ['./analysis.type.dialog.scss']
})
export class AnalysisTypeDialog {
  types = [];
    constructor(public dialogRef: MatDialogRef<AnalysisTypeDialog>, private documentService: DocumentService) {
      this.documentService.getAnalysisCardTypeList().subscribe(res => {
        this.types = res.content;
      });
    }
}
