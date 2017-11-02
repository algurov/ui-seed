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
  options = [{id: 1, name: 'На качество'}, {id: 2, name: 'На безопасность'}];
  nodes = [{id:1, name: '222', children: [{id:2, name: 'sdsadsdasdaa'}]}];
  contractEmpty: boolean = true;
  subscription : any;
  constructor(public dialog: MatDialog,
     private stringService: StringService,
     private mainService: MainService,
    private dialogService: DialogService) {
      this.subscription = this.mainService.standardParameterAdded.subscribe(item => {
         if(!this.data.applicationStandardResearches) {
           this.data.applicationStandardResearches = [];
         }
         if (!this.data.applicationStandardResearches.find(it => {
           if(it.standard){
          return it.standard.id == item.id;
        } else { return false;}
         })) {
           this.data.applicationStandardResearches.push({standard:item, applicationResearches: []});
           this.dialogService.showNotification('Стандарт "'+ item.shortName + '" добавлен к заявке');
           console.log(this.data.applicationStandardResearches);
         }
       });
     }

  ngOnInit() {
    if (!this.data.customStandard) {
      this.data.customStandard = {};
    } else {
      this.contractEmpty = false;
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onStandardRemoved(standard) {
    console.log(standard);
    if (standard == 'contract') {
      this.contractEmpty = !this.contractEmpty;
      let index = this.data.applicationStandardResearches.findIndex(item => item.standard == null);
      console.log(index);
        this.data.applicationStandardResearches.splice(index, 1);
        console.log(this.data.applicationStandardResearches);
    } else {
      let index = this.data.applicationStandardResearches.findIndex(item => {
        if (item.standard) {
          return item.standard.id == standard.id;
        } else {
          return false;
        }
      });
      console.log(index);
        this.data.applicationStandardResearches.splice(index, 1);
        console.log(this.data.applicationStandardResearches);
    }
  }

  addStandard() {
    let dialogRef = this.dialog.open(SelectStandardDialog, {
     data: {
       product: this.data.goods
     }
   });
   dialogRef.afterClosed().subscribe(result => {
       if (result) {
         if (!this.data.applicationStandardResearches.find(item => item.standard.id == result.id)) {
           this.data.applicationStandardResearches.push({standard:result, applicationResearches:[]});
         }
       }
     });
  }

  addContract() {
    if (this.data.goods) {
      this.contractEmpty = !this.contractEmpty;
      if (!this.data.applicationStandardResearches) {
        this.data.applicationStandardResearches = [];
      }
      this.data.applicationStandardResearches.push({standard: null, customContract:{name: 'Контракт'}, applicationResearches: []});
      console.log(this.data.applicationStandardResearches);
    }
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
