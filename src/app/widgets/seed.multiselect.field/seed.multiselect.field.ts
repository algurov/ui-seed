import { Component, Input, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StringService } from '../../services/string.service';
import { PartnerService } from '../../services/partner.service';
import { TaxonomyService } from '../../services/taxonomy.service';
import { Location } from '../../models/location';
import { Observable } from 'rxjs';



@Component({
  selector: 'seed-multiselect-field',
  templateUrl: './seed.multiselect.field.html',
  styleUrls: ['./seed.multiselect.field.scss']
})
export class SeedMutiselectField {
  @Input() taxonomy: string;
  @Input() taxonomyParams: Array<any>;
  selectedData: Array<any> = new Array<any>();
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
      let result = '';
      this.selectedData.forEach(item => {
        result += item[this.nameFieldToView] + ', ';
      });
      if (result.length > 0) {
        result = result.substr(0, result.length - 2);
      }
      return result;
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

       dialogRef = this.dialog.open(SelectDialogMultiple, {
        data: {
          taxonomy: this.taxonomy,
          taxonomyParams: this.taxonomyParams,
          nameField: this.nameField,
          selectedData: this.selectedData
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
  selector: 'select-dlg-multiple',
  templateUrl: './select.dialog.multiple.html',
  styleUrls: ['/select.dialog.multiple.scss']
})
export class SelectDialogMultiple {
  dialog: MatDialogRef<SelectDialogMultiple>;
  list: Array<any>;
  fullList: Array<any>;
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
    public dialogRef: MatDialogRef<SelectDialogMultiple>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.taxonomy = data.taxonomy;
    this.taxonomyParams = data.taxonomyParams;
    this.nameField = data.nameField;
    this.selectedData = data.selectedData;
   }

   addNameFilter(name) {
     name = name.trim();
     let param = [{field:'fullName', value: name}];
     this.loaded = false;
     this.taxonomyService.searchTaxonomyDataByParams(this.taxonomy, param.concat(this.taxonomyParams)).subscribe(res => {
       this.list = res.content;
       this.fullList.forEach(item => {
         if (this.selectedData.find(it => it.id == item.id)){
           this.checkedArray[item.id] = true;
         } else {
           this.checkedArray[item.id] = false;
         }
       });
       this.loaded = true;
     });
   }

   selectItem(event, item) {
     if (item) {
      this.selectedData = [];
      this.checkedArray[item.id] = event.checked;
      this.fullList.forEach(item => {
        if(this.checkedArray[item.id]) {
          this.selectedData.push(item);
        }
      });
      this.change.emit(this.selectedData);
   }
 }

   ngOnInit() {
     this.taxonomyService.searchTaxonomyDataByParams(this.taxonomy, this.taxonomyParams).subscribe(res => {
       this.list = res.content;
       this.fullList = res.content;
       this.list.forEach(item => {
         if (this.selectedData.find(it => it.id == item.id)){
           this.checkedArray[item.id] = true;
         } else {
           this.checkedArray[item.id] = false;
         }
       });
       this.loaded = true;
     })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
