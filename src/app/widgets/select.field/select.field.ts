import { Component, Input, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StringService } from '../../services/string.service';
import { PartnerService } from '../../services/partner.service';
import { TaxonomyService } from '../../services/taxonomy.service';
import { Location } from '../../models/location';
import { Observable } from 'rxjs';



@Component({
  selector: 'select-field',
  templateUrl: './select.field.html',
  styleUrls: ['./select.field.scss']
})
export class SelectField {
  @Input() taxonomy: string;
  @Input() taxonomyParams: Array<any>;
  selectedData: any;
  @Input() placeholder;
  @Input() placeholderType: boolean = true;
  @Input() nameField: string;
  @Input() nameFieldToView: string;
  _data : any = {};
  @Input() enabled = true;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  value: any = {};
  @Input() set data(value: any) {
    if (value) {
      this._data = value;
      this.updateData(this._data);
    }
  }
  get data(): any {
    return this._data;
  }



  constructor(public dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if(changes.data.currentValue) {
    // this.updateData(changes.data.currentValue);
  //}

  }
  getTitle() {
    if (this.selectedData) {
      return this.selectedData[this.nameFieldToView];
    }
    return '';
  }

  updateData(input) {
    this.selectedData = input;
    //this.value.standard = this.selectedData;
  }

  ngOnInit() {
    if (this._data) {
      this.value = this._data;
    }
  }

  openDialog() {
    if(this.enabled) {
      let dialogRef = null;

       dialogRef = this.dialog.open(SelectFieldDialog, {
        data: {
          taxonomy: this.taxonomy,
          taxonomyParams: this.taxonomyParams,
          nameField: this.nameField
        }
      });
      dialogRef.componentInstance.change.subscribe(res => {
        this.selectedData = res;
          this.change.emit(this.selectedData);
      });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.value = result;
          this.change.emit(this.value);
        }
      });
    }
  }
}

@Component({
  selector: 'select-field-dlg',
  templateUrl: './select.field.dialog.html',
  styleUrls: ['/select.field.dialog.scss']
})
export class SelectFieldDialog {
  dialog: MatDialogRef<SelectFieldDialog>;
  list: Array<any>;
  selectedData: Array<any>;
  loaded = false;
  taxonomy: string;
  taxonomyParams: Array<any>;
  nameField: string;
  checkedArray: any = {};
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private stringService: StringService,
    private taxonomyService: TaxonomyService,
    public dialogRef: MatDialogRef<SelectFieldDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.taxonomy = data.taxonomy;
    this.taxonomyParams = data.taxonomyParams;
    this.nameField = data.nameField;
   }

   addNameFilter(name) {
     name = name.trim();
     let param = [{field:'fullName', value: name}];
     this.loaded = false;
     this.taxonomyService.searchTaxonomyDataByParams(this.taxonomy, param.concat(this.taxonomyParams)).subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     });
   }

   selectItem(item) {
     if (item) {
      this.selectedData = item;
      this.change.emit(this.selectedData);
      this.dialogRef.close();
   }
 }

   ngOnInit() {
     this.taxonomyService.searchTaxonomyDataByParams(this.taxonomy, this.taxonomyParams).subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
