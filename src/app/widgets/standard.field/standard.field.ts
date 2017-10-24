import { Component, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StringService } from '../../services/string.service';
import { MainService } from '../../services/main.service';
import { TaxonomyService } from '../../services/taxonomy.service';
import { TreeComponent } from 'angular2-tree-component';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'standard-field',
  templateUrl: './standard.field.html',
  styleUrls: ['./standard.field.scss']
})
export class StandardField {
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  @Input() standard: any;
  nodes: Array<any> = new Array<any>()
  properties: Array<any> = new Array<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private dialogService: DialogService) {}

  selectProperty() {
    let dialogRef = this.dialog.open(StandardPropertyDialog, {
        data: {
          standard: this.standard
        }
      });
    dialogRef.componentInstance.propertySelected.subscribe(item => {
      this.addItem(item);
      this.dialogService.showNotification('Параметр "' + item.name + '" добавлен');
    });
    dialogRef.afterClosed().subscribe(result => {
      });
  }

  addItem(item) {
    this.properties.push(item);
    this.addNewItem(item);
  }
  removeStandard() {
    console.log(this.standard);
    this.removed.emit(this.standard);
  }

  addNewItem(item) {
    if (this.tree.treeModel.getFocusedNode()) {
      this.insertItemToTree(item, this.tree.treeModel.getFocusedNode().data, this.nodes);
    } else {
        this.nodes.push(item);
    }
    this.tree.treeModel.update();
  }

  removeItem(item) {
    console.log(item.data);
    this.removeItemFromTree(item.data, this.nodes);
    this.tree.treeModel.update();
  }

  insertItemToTree(data, parent, arr) {
    let found = -1;
    arr.forEach((element, index) => {
      if (element.id == parent.id) {
        found = index;
      } else {
        if (element.children) {
          this.insertItemToTree(data, parent, element.children);
        }
      }
    });
    if (found >= 0) {
      if (!arr[found].children) {
        arr[found].children = [];
      }
      arr[found].children.push(data);
    }
  }

  removeItemFromTree(item, arr: Array<any>) {
      let found = -1;
      arr.forEach((element, index) => {
        if (element.id == item.id) {
          found = index;
        } else {
          if (element.children) {
            this.removeItemFromTree(item, element.children);
          }
        }
      });
      if (found >= 0) {
        arr = arr.splice(found, 1);
      }
  }
}

@Component({
  selector: 'standard-property-dlg',
  templateUrl: './standard.property.dialog.html',
  styleUrls: ['./standard.property.dialog.scss']
})
export class StandardPropertyDialog {
  dialog: MatDialogRef<StandardPropertyDialog>;
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  standard: any;
  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private stringService: StringService,
    private taxonmyService: TaxonomyService,
    public dialogRef: MatDialogRef<StandardPropertyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.standard = data.standard;
   }

   addNameFilter(name) {
     let params = [{field:'name', value: name}];
     this.loaded = false;
    //  this.taxonmyService.searchPartnersByParams(params).subscribe(res => {
    //    this.list = res.content;
    //    this.loaded = true;
    //  });
   }

   select(item) {
     if (item) {
      this.selectedItem = item;
      this.propertySelected.emit(this.selectedItem);
      //this.dialogRef.close(this.selectItem);
    } else {
      this.dialogRef.close();
    }
   }

   ngOnInit() {
     let params = [{field:'standart.id', value: this.standard.id}];
     this.taxonmyService.searchTaxonomyDataByParams('GoodsCategoryProperty', params).subscribe(res => {
       this.list = res.content;
       this.loaded = true;
     })
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
