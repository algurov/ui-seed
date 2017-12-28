import { Component, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../../../services/string.service';
import { DocumentService } from '../../../../services/document.service';
import { ITreeOptions, TreeComponent } from 'angular2-tree-component';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'goods-category-dlg',
  templateUrl: './goods.category.dialog.html',
  styleUrls: ['/goods.category.dialog.scss']
})
export class GoodsCategoryDialog {
  options : ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  dialog: MatDialogRef<GoodsCategoryDialog>;
  actId: number;
  list: Array<any>;
  allList: Array<any>;
  selectedItem: any;
  loaded = false;
  loadedAll = false;
  listToView: Array<any> = new Array<any>();
  standard: any;
  customStandard = false;
  goodId: number;
  selectedIds: Array<number> = new Array<number>();
  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() goodsCategoryPropertySelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private stringService: StringService,
    private documentService: DocumentService,
    public dialogRef: MatDialogRef<GoodsCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.actId = data.actId;
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
      if (node.parentId != null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
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

  select(item) {
    if (item) {
      this.selectedItem = item;
      this.propertySelected.emit(this.selectedItem);
    } else {
      this.dialogRef.close();
    }
  }

  selectProperty(item) {
    this.propertySelected.emit(item);
  }

  selectGoodsCategoryProperty(item) {
    this.goodsCategoryPropertySelected.emit(item);
  }

  ngOnInit() {
    this.documentService.getGoodsCategories(this.actId)
        .subscribe(res => {
          this.list = res;
          this.list.forEach(item => {
            item.name = item.standardName;
            item.goodsCategoryAttributes.forEach(sub => {
              sub.name = sub.shortName;
              sub.checked = false;
            });
            item.children = this.processData_2(item.goodsCategoryAttributes);
            //item.children = item.goodsCategoryAttributes;
          });
          this.listToView = this.list;
          console.log(this.listToView);
          this.loaded = true;
        });
}

  onNodeStateChange(event) {
    let index = this.selectedIds.findIndex(item => item == event.node.data.id);
    if (event.checked) {
      if (index < 0) {
        this.selectedIds.push(event.node.data.id);
      }
    } else {
      if (index >= 0) {
        this.selectedIds.splice(index, 1);
      }
    }
  }
  closeWithResult() {
    this.dialogRef.close(this.selectedIds);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
