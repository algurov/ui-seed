import { Component, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../../../services/string.service';
import { DocumentService } from '../../../../services/document.service';
import { ITreeOptions, TreeComponent } from 'angular2-tree-component';
import { Observable } from 'rxjs/Observable';
import { CalculationService } from '../../../../services/calculation.service';
@Component({
  selector: 'service-dlg',
  templateUrl: './service.dialog.html',
  styleUrls: ['/service.dialog.scss']
})
export class ServiceDialog {
  options : ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  dialog: MatDialogRef<ServiceDialog>;
  pricelistTypeList: Array<any> = new Array<any>();
  pricelistType = 1;

  list: Array<any>;
  allList: Array<any>;
  selectedItem: any;
  loaded = false;
  loadedAll = false;
  listToView: Array<any> = new Array<any>();
  standard: any;
  customStandard = false;
  goodId: number;
  branchOffice: any;
  selectedIds: Array<number> = new Array<number>();
  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() goodsCategoryPropertySelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private calculationService : CalculationService,
    private stringService: StringService,
    private documentService: DocumentService,
    public dialogRef: MatDialogRef<ServiceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.branchOffice = data.branchOffice;
  }

  onPricelistTypeChange(event) {
    this.pricelistType = event.value;
    this.reload();
  }

  selectFromTree(event) {
    this.select(event);
  }

  processData_2(list) {

    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent != null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parent.id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }


  addNameFilterTree(text) {
    this.tree.treeModel.filterNodes((node) => {
      if (node.data.name.toLowerCase().search(text) >= 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  select(node) {
    if (node) {
      if (node.parent.data.virtual) {
        if (node.children.length == 0) {
          this.propertySelected.emit(node.data);
        }
      } else {
        this.propertySelected.emit(node.data);
      }
  }
}

  selectProperty(item) {
    this.propertySelected.emit(item);
  }

  selectGoodsCategoryProperty(item) {
    this.goodsCategoryPropertySelected.emit(item);
  }

  prepareTree() {
    let arr = [];
    let tmp = this.processData_2(this.list);
    tmp.forEach(item => {
      if (item.pricelistCategory == null) {
        arr.push(item);
      } else {
        let found = arr.find(it => it.id == item.pricelistCategory.id);
        if (found) {
          if (!found.children) {
            found.children = [];
          }
          found.children.push(item);
        } else {
          item.pricelistCategory.children = [item];
          arr.push(item.pricelistCategory);
        }
      }
    });
    console.log(arr);
    return arr;
  }
  reload() {
    this.calculationService.getPricelistItemListByTypeAndBranchOffice(this.pricelistType, this.branchOffice.id).subscribe(res => {
      this.list = res.content;
      this.listToView = this.prepareTree();
    });
  }
  ngOnInit() {
    this.calculationService.getPricelistTypeList().subscribe(res => {
      this.pricelistTypeList = res.content;
    });
    this.calculationService.getPricelistItemListByTypeAndBranchOffice(this.pricelistType, this.branchOffice.id).subscribe(res => {
      this.list = res.content;
      this.listToView = this.prepareTree();
      this.loaded = true;
    });

    // this.documentService.getGoodsCategories(this.actId)
    //     .subscribe(res => {
    //       this.list = res;
    //       this.list.forEach(item => {
    //         item.name = item.standardName;
    //         item.goodsCategoryAttributes.forEach(sub => {
    //           sub.name = sub.shortName;
    //           sub.checked = false;
    //         });
    //         item.children = this.processData_2(item.goodsCategoryAttributes);
    //         //item.children = item.goodsCategoryAttributes;
    //       });
    //       this.listToView = this.list;
    //       console.log(this.listToView);
    //       this.loaded = true;
    //     });
}

  closeWithResult() {
    this.dialogRef.close(this.selectedIds);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
