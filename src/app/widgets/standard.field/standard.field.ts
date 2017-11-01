import { Component, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../services/string.service';
import { MainService } from '../../services/main.service';
import { TaxonomyService } from '../../services/taxonomy.service';
import { TreeComponent } from 'angular2-tree-component';
import { DialogService } from '../../services/dialog.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular2-tree-component';

@Component({
  selector: 'standard-field',
  templateUrl: './standard.field.html',
  styleUrls: ['./standard.field.scss']
})
export class StandardField {
  lastSelectedNode :any;
  options : ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  @ViewChild('wrap') wrap: any;
  @ViewChild('wrap2') wrap2: any;
  @Input() standard: any;
  customStandard = false;
  @Input() data: any;
  nodes: Array<any> = new Array<any>()
  properties: Array<any> = new Array<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  visible: boolean = true;
  constructor(private dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit() {
    if (!this.standard) {
      this.customStandard = true;
      this.standard = {};
      console.log(this.standard);
    }
  }

  toggleVisible() {
    this.visible = ! this.visible;
  }

  selectProperty() {
    this.lastSelectedNode = this.tree.treeModel.getFocusedNode();
    let dialogRef = this.dialog.open(StandardPropertyDialog, {
      data: {
        standard: this.standard,
        custom: this.customStandard,
        goodId: this.data.goods.id
      }
    });
    dialogRef.componentInstance.propertySelected.subscribe(item => {
      this.addProperty(item);
      this.dialogService.showNotification('Параметр "' +
        (item.name ? item.name : item.nameRu) + '" добавлен');
    });
    dialogRef.componentInstance.goodsCategoryPropertySelected.subscribe(item => {
      this.addGoodsCategoryProperty(item);
      this.dialogService.showNotification('Параметр "' +
        (item.name ? item.name : item.nameRu) + '" добавлен');
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lastSelectedNode = null;
    });
  }

  addItem(item) {
    this.addNewItem(item);
  }

  addGoodsCategoryProperty(item) {
    this.addNewItem(this.wrapGoodsCategoryProperty(item));
  }

  addProperty(item) {
    this.addNewItem(this.wrapProperty(item));
  }

  wrapProperty(item) {
    let children = [];
    if (item.children) {
      item.children.forEach(it => {
        children.push(this.wrapProperty(it));
      })
    }
    return {
      children: children,
      property: item
    }
  }

  wrapGoodsCategoryProperty(item) {
    let children = [];
    if (item.children) {
      item.children.forEach(it => {
        children.push(this.wrapGoodsCategoryProperty(it));
      })
    }
    return {
      children: children,
      goodsCategoryProperty: item
    }
  }

  removeStandard() {
    if (!this.customStandard) {
      this.removed.emit(this.standard);
    } else {
      this.standard.nodes = [];
      this.tree.treeModel.update();
      this.removed.emit('contract');
    }
  }
onClickOutside(ev) {
  if(ev.value == true) {
    this.tree.treeModel.setFocusedNode(null);
    this.tree.treeModel.setActiveNode(null, null);
  }
}
  addNewItem(item) {
    if (this.lastSelectedNode) {
      this.insertItemToTree(item, this.lastSelectedNode.data, this.standard.nodes);
    } else {
      if (!this.standard.nodes) {
        this.standard.nodes = [];
      }
      this.standard.nodes.push(item);
    }
    this.tree.treeModel.update();
    if (this.wrap) {
      this.wrap.nativeElement.style = "height: auto;";
    }
    if (this.wrap2) {
      this.wrap2.nativeElement.style = "height: auto;";
    }


  }

  removeItem(item) {
    console.log(item.data);
    this.removeItemFromTree(item.data, this.standard.nodes);
    this.tree.treeModel.update();
  }

  insertItemToTree(data, parent, arr) {
    let found = -1;
    arr.forEach((element, index) => {
      if (element.uuid == parent.uuid) {
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
      if (element.uuid == item.uuid) {
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

  isToggleVisible(node) {
    return node.parent.data.virtual;
  }

  getTitleForNode(node) {
    if (node.data.property) {
      return node.data.property.nameRu;
    } else {
      return node.data.goodsCategoryProperty.name;
    }
  }
}

@Component({
  selector: 'standard-property-dlg',
  templateUrl: './standard.property.dialog.html',
  styleUrls: ['./standard.property.dialog.scss']
})
export class StandardPropertyDialog {
  options : ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  dialog: MatDialogRef<StandardPropertyDialog>;
  list: Array<any>;
  allList: Array<any>;
  selectedItem: any;
  loaded = false;
  loadedAll = false;
  listToView: Array<any> = new Array<any>();
  standard: any;
  customStandard = false;
  goodId: number;
  param = { placeholder: 'Текст' };
  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() goodsCategoryPropertySelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private stringService: StringService,
    private taxonmyService: TaxonomyService,
    public dialogRef: MatDialogRef<StandardPropertyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    this.standard = data.standard;
    this.goodId = data.goodId;
    this.customStandard = data.custom;
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


  processData() {
    this.list.sort((n1, n2) => {
      if (n1.parent == null && n2.parent == null) {
        return 0;
      }
      if (n1.parent == null && n2.parent != null) {
        return -1;
      }
      if (n1.parent != null && n2.parent == null) {
        return 1;
      }
    });
    this.list.forEach(item => {
      let found = this.listToView.find(it => {
        if (!item.parent) return false;
        return it.id == item.parent.id
      });
      if (found) {
        if (!found.children) {
          found.children = [];
        }
        found.children.push(item);
      } else {
        this.listToView.push(item);
      }
    });
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
  addNameFilter(name) {
    name = name.trim();
    let params = [{ field: 'name', value: name }, { field: 'standard.id', value: this.standard.id }, { field: 'goodsCategory.goods.id', value: this.goodId }];
    this.loaded = false;
    this.taxonmyService.searchTaxonomyDataByParams('GoodsCategoryProperty', params).subscribe(res => {
      this.list = res.content;
      this.listToView = this.processData_2(this.list);
      this.loaded = true;
    });
  }

  addNameFilterAll(name) {
    name = name.trim();
    let params = [{ field: 'nameRu', value: name }];
    this.loadedAll = false;
    this.taxonmyService.searchTaxonomyDataByParams('Property', params).subscribe(res => {
      this.allList = res.content;
      this.loadedAll = true;
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
    if (!this.customStandard) {
      let params = [{ field: 'standard.id', value: this.standard.id }, { field: 'goodsCategory.goods.id', value: this.data.goodId }];
      this.taxonmyService.searchTaxonomyDataByParams('GoodsCategoryProperty', params).subscribe(res => {
        this.list = res.content;
        this.listToView = this.processData_2(this.list);
        this.loaded = true;
      });
    } else {
      this.loaded = true;
    }
    this.taxonmyService.searchTaxonomyDataByParams('Property', []).subscribe(res => {
      this.allList = res.content;
      this.loadedAll = true;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
