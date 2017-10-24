import { Component, Input, Inject } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { DialogService } from '../../../../services/dialog.service';


@Component({
  selector: 'application-standard',
  templateUrl: './application.standard.component.html',
  styleUrls: ['./application.standard.component.scss']
})
export class ApplicationStandardComponent {
  @Input() data;
  param = {placeholder: 'Текст'};
  options = [{id: 1, name: 'На качество'}, {id: 2, name: 'На безопасность'}];
  nodes = [{id:1, name: '222', children: [{id:2, name: 'sdsadsdasdaa'}]}];
  standards = []
  constructor(public dialog: MatDialog,
     private stringService: StringService,
     private mainService: MainService,
    private dialogService: DialogService) {
       this.mainService.standardParameterAdded.subscribe(item => {
         if (!this.standards.find(it => it.id == item.id)) {
           this.standards.push(item);
           this.dialogService.showNotification('Стандарт "'+ item.shortName + '" добавлен к заявке');
           console.log(this.standards);
         }
       });
     }

  ngOnInit() {

  }
  onStandardRemoved(standard) {

    let index = this.standards.findIndex(item => item.id == standard.id);
    console.log(index);
      this.standards.splice(index, 1);
      console.log(this.standards);
  }

  addStandard() {
    let dialogRef = this.dialog.open(SelectStandardDialog, {
     data: {
       product: this.data.goodsRelation
     }
   });
   dialogRef.afterClosed().subscribe(result => {
       if (result) {
         if (!this.standards.find(item => item.id == result.id)) {
           this.standards.push(result);
         }
       }
     });
  }

  addItem() {
    this.mainService.productParamAdded.emit({id: Math.random(), name:'name', option: 0});
  }
}

@Component({
  selector: 'select-standard-dlg',
  templateUrl: './select.standard.dialog.html',
  styleUrls: ['./select.standard.dialog.scss']
})
export class SelectStandardDialog {
  dialog: MatDialogRef<SelectStandardDialog>;
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  product: any;
  constructor(
    private mainService: MainService,
    private stringService: StringService,
    public taxonomyService: TaxonomyService,
    public dialogRef: MatDialogRef<SelectStandardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.product = data.product;
   }

   addNameFilter(name) {
     let params = [{field:'name', value: name}];
     this.loaded = false;
     this.taxonomyService.searchTaxonomyDataBySubQuery('Standard', 'byGoods', this.product.id, params).subscribe(res => {
       this.list = res;
       this.loaded = true;
     });
   }
   select(item) {
     if (item) {
      this.selectItem = item;
      this.mainService.standardParameterAdded.emit(this.selectItem);
      //this.dialogRef.close(this.selectItem);
    } else {
      this.dialogRef.close();
    }
   }
   selectItem(item) {

   }

   ngOnInit() {
     this.taxonomyService.searchTaxonomyDataBySubQuery('Standard', 'byGoods', this.product.id).subscribe(res => {
       this.list = res;
       this.loaded = true;
     });
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
