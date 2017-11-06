import { Component, Input, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StringService } from '../../services/string.service';
import { PartnerService } from '../../services/partner.service';
import { TaxonomyService } from '../../services/taxonomy.service';
import { Location } from '../../models/location';



@Component({
  selector: 'seed-select-field',
  templateUrl: './seed.select.field.html',
  styleUrls: ['./seed.select.field.scss']
})
export class SeedSelectField {
  @Input() code;
  @Input() placeholder;
  @Input() placeholderType: boolean = true;
  _data : any = {};
  @Input() set data(value: any) {
    if (value) {
      this._data = value;
      this.updateData(this._data);
    }
  }
  get data(): any {
    return this._data;
  }

  @Input() enabled = true;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  value: any = {};
  constructor(public dialog: MatDialog) {
  }
  ngOnChanges(changes: SimpleChanges) {
    // if(changes.data.currentValue) {
    // this.updateData(changes.data.currentValue);
  //}

  }
  getTitle() {
      if (this.code == 'partner') {
        if (this.value.name) {
          return this.value.name;
        }
      }
      if (this.code == 'laboratory') {
        if (this.value.name) {
          return this.value.name;
        }
      }
      if (this.code == 'product') {
        if (this.value.fullNameRu) {
          return this.value.fullNameRu;
        }
      }
      if (this.code == 'place') {
        let loc = new Location().deserialize(this.value);
          return loc.getTitle();

        // if (this.value.titleRu) {
        //   let result = '';
        //   if (this.value.country) {
        //     result += this.value.country.titleRu + ', ';
        //   }
        //   if (this.value.region) {
        //     result += this.value.region.titleRu + ', ';
        //   }
        //   result += this.value.titleRu;
        //   return result;
        // }
      }
      return '';

  }
  updateData(input) {
    this.value = input;
  }
  ngOnInit() {
    if (this._data) {
      this.value = this._data;
    }
  }
  openDialog() {
    if(this.enabled) {
      let dialogRef = null;
    if (this.code == 'partner') {
       dialogRef = this.dialog.open(SelectDialog, {
        data: {
          code: this.code
        }
      });
    }
    if (this.code == 'laboratory') {
       dialogRef = this.dialog.open(SelectLaboratoryDialog, {
        data: {
          code: this.code
        }
      });
    }
    if (this.code == 'place') {
      dialogRef = this.dialog.open(SelectPlaceDialog, {
       data: {
         code: this.code,
         selected: this.value
       }
     });
    }

    if (this.code == 'product') {
       dialogRef = this.dialog.open(SelectProductDialog, {
        data: {
          code: this.code
        }
      });
    }
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
  selector: 'select-dlg',
  templateUrl: 'select.dialog.html',
  styleUrls: ['/select.dialog.scss']
})
export class SelectDialog {
  dialog: MatDialogRef<SelectDialog>;
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  constructor(
    private stringService: StringService,
    private partnerService: PartnerService,
    public dialogRef: MatDialogRef<SelectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
   }

   addNameFilter(name) {
     name = name.trim();
     let params = [{field:'name', value: name}];
     this.loaded = false;
     this.partnerService.searchPartnersByParams(params).subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     });
   }

   selectItem(item) {
     if (item) {
      this.selectItem = item;
      this.dialogRef.close(this.selectItem);
    } else {
      this.dialogRef.close();
    }
   }

   ngOnInit() {
     this.partnerService.getPartnerList().subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'select-laboratory-dlg',
  templateUrl: 'select.laboratory.dialog.html',
  styleUrls: ['/select.laboratory.dialog.scss']
})
export class SelectLaboratoryDialog {
  dialog: MatDialogRef<SelectLaboratoryDialog>;
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  constructor(
    private stringService: StringService,
    private taxonomyService: TaxonomyService,
    public dialogRef: MatDialogRef<SelectLaboratoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
   }

   addNameFilter(name) {
     name = name.trim();
     let params = [{field:'name', value: name}];
     this.loaded = false;
     this.taxonomyService.searchTaxonomyDataByParams('Laboratory', params).subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     });
   }

   selectItem(item) {
     if (item) {
      this.selectItem = item;
      this.dialogRef.close(this.selectItem);
    } else {
      this.dialogRef.close();
    }
   }

   ngOnInit() {
     this.taxonomyService.loadTaxonomyData('Laboratory').subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'select-place-dlg',
  templateUrl: './select.place.dialog.html',
  styleUrls: ['./select.dialog.scss']
})
export class SelectPlaceDialog {
  dialog: MatDialogRef<SelectPlaceDialog>;
  countryList: Array<any>;
  regionList: Array<any>;
  cityList: Array<any>;
  list: Array<any>;
  selectedItem: Location;
  loaded = true;

  constructor(
    private taxonomyService: TaxonomyService,
    private stringService: StringService,
    public dialogRef: MatDialogRef<SelectPlaceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    if (data.selected) {
      this.selectedItem = data.selected;
    } else {

    }
   }

   addNameFilter(name) {
     this.list = [];
     name = name.trim();
     let params = [{field:'titleRu', value: name}];
     this.loaded = false;
     this.taxonomyService.searchTaxonomyDataByParams('Countries', params).subscribe(res => {
      this.list = this.list.concat(res.content);
      this.countryList = res.content;
      this.taxonomyService.searchTaxonomyDataByParams('Regiones', params).subscribe(res => {
       this.list = this.list.concat(res.content);
       this.regionList = res.content;
       this.taxonomyService.searchTaxonomyDataByParams('Cities', params).subscribe(res => {
        this.list = this.list.concat(res.content);
        this.cityList = res.content;
         this.loaded = true;
       });
      });
     });


   }
   clearSelectedFields() {
     if (this.selectedItem) {
       this.selectedItem.country = null;
       this.selectedItem.region = null;
       this.selectedItem.city = null;
     }
   }

   selectCounrty(country) {
     if (this.selectedItem) {
       this.clearSelectedFields();
       this.selectedItem.country = country;
       this.dialogRef.close(this.selectedItem);
     }
   }

   selectRegion(region) {
     if (this.selectedItem) {
       this.clearSelectedFields();
       this.selectedItem.region = region;
       this.dialogRef.close(this.selectedItem);
     }
   }

   selectCity(city) {
     if (this.selectedItem) {
       this.clearSelectedFields();
       this.selectedItem.city = city;
       this.dialogRef.close(this.selectedItem);
     }
   }

   selectItem(item) {
     if (item) {
      this.clearSelectedFields();
      this.selectedItem = item;
      this.dialogRef.close(this.selectedItem);
    } else {
      this.dialogRef.close();
    }
   }

   getTitleForField(item) {
         if (item.titleRu) {
           let result = '';
           if (item.country) {
             result += item.country.titleRu + ', ';
           }
           if (item.region) {
             result += item.region.titleRu + ', ';
           }
           result += item.titleRu;
           return result;
         }
       return '';

   }
   ngOnInit() {
    //  this.partnerService.getPartnerList().subscribe(res => {
    //    this.list = res.content;
    //    this.loaded = true;
    //  })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'select-product-dlg',
  templateUrl: './select.product.dialog.html',
  styleUrls: ['./select.dialog.scss']
})
export class SelectProductDialog {
  dialog: MatDialogRef<SelectPlaceDialog>;
  list: Array<any>;
  listToView: Array<any> = [];
  selectedItem: any;
  loaded = true;
  constructor(
    private taxonomyService: TaxonomyService,
    private stringService: StringService,
    public dialogRef: MatDialogRef<SelectPlaceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
   }

   addNameFilter(name) {
     name = name.trim();
     this.list = [];
     this.listToView = [];
     let params = [{field:'fullNameRu', value: name}];
     this.loaded = false;
     this.taxonomyService.searchTaxonomyDataByParams('Goods', params).subscribe(res => {
      this.list = res.content;
      this.processData();
      this.loaded = true;
     });
   }

   processData() {
     this.list.sort((n1, n2) => {
       if(n1.parent == null && n2.parent == null) {
         return 0;
       }
       if(n1.parent == null && n2.parent != null) {
         return -1;
       }
       if(n1.parent != null && n2.parent == null) {
         return 1;
       }
     });
     this.list.forEach(item => {
       let found = this.listToView.find(it => {
         if (item.parent == null) {
           return false;
         }
       return it.id == item.parent.id;
       });
       if (found) {
         if (!found.children) {
           found.children = [];
         }
         found.children.push(item);
       } else {
         if (item.parent) {
           item.parent.children = [item];
           this.listToView.push(item.parent);
         } else {
           this.listToView.push(item);
        }
       }
     });
   }

   selectItem(item) {
     if (item) {
      this.selectedItem = item;
      if (this.selectedItem.parent) {
        delete this.selectedItem.parent.children;
      }
      delete this.selectedItem.children;
      this.dialogRef.close(this.selectedItem);
    } else {
      this.dialogRef.close();
    }
   }

   getTitle(item) {
         if (item.titleRu) {
           let result = '';
           if (item.country) {
             result += item.country.titleRu + ', ';
           }
           if (item.region) {
             result += item.region.titleRu + ', ';
           }
           result += item.titleRu;
           return result;
         }
       return '';

   }
   ngOnInit() {
     this.loaded = false;
     this.listToView = [];
     this.taxonomyService.loadTaxonomyData('Goods').subscribe(res => {
      this.list = res.content;
      this.processData();
      this.loaded = true;
     });
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
