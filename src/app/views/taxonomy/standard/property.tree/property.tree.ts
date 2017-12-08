import { Component, Input, Output, EventEmitter, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { TreeComponent } from 'angular2-tree-component';
import { DialogService } from '../../../../services/dialog.service';
import { DataService } from '../../../../services/data.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular2-tree-component';

@Component({
  selector: 'property-tree',
  templateUrl: './property.tree.html',
  styleUrls: ['./property.tree.scss']
})
export class PropertyTree {
  lastSelectedNode: any;
  options: ITreeOptions = {
    idField: 'uuid'
  };
  @Input() assignment;
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  @ViewChild('wrap') wrap: any;
  @ViewChild('wrap2') wrap2: any;
  standard: any;
  customStandard = false;
  researches: any;
  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() onNodeDelete = new EventEmitter();
  @Output() onNodeAdd = new EventEmitter();
  nodes: Array<any> = new Array<any>()
  properties: Array<any> = new Array<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  visible: boolean = true;
@Input()
  set dataValue(val) {
    this.data = val;
    this.initNodes();
    this.dataChange.emit(this.data);
  }

  constructor(private dialog: MatDialog, private dialogService: DialogService,
    private dataService: DataService, private mainService: MainService, private taxonomyService: TaxonomyService) {
    // this.mainService.directionLoaded.subscribe(item => {
    //   this.data = item;

    // });
  }

  ngOnInit() {
    this.initNodes();
  }

  unwrapNew(node) {
    let result = node.data.value;
    let children = [];
    if (node.children) {
      node.children.forEach(child => {
        children.push(this.unwrapNew(child));

      });
      result.children = children;
    }
    return result;
  }

  // unwrap(node) {
  //   let result = node.value;
  //   if (result.propertyType) {
  //   delete result.propertyType;
  //   let children = [];
  //   if(result.children) {
  //       result.children.forEach(child => {
  //           children.push(this.unwrap(child));
  //       });
  //   }
  //   result.children = children;
  //   }
  //   return result;
  // }

  initNodes() {
    if (this.data.length > 0) {
      this.data.forEach(item => {
        let node = this.wrapNode(item);
        this.nodes.push(node);
      });
        this.data = this.nodes;
        this.tree.treeModel.update();
    }
  }

  wrapNode(goodsCategoryProperty) {

    let children = [];
    if (goodsCategoryProperty.goodsCategoryPropertyValues.length == 0) {
      goodsCategoryProperty.goodsCategoryPropertyValues = [{min:null, max: null, text: null}];
    }
    goodsCategoryProperty.children.forEach(child => {
      children.push(this.wrapNode(child));
    });
    goodsCategoryProperty.children = children;
    return goodsCategoryProperty;
  }

  findItemInTree(item, arr: Array<any>) {
    let found = null;
    for (let i = 0; i < arr.length && !found; i++) {
      if (arr[i].id == item.id) {
        found = arr[i];
      } else {
        if (arr[i].children) {
          found = this.findItemInTree(item, arr[i].children);
        }
      }
    }
    return found;
  }

  findItemInTreeByUid(item, arr: Array<any>) {
    let found = null;
    for (let i = 0; i < arr.length && !found; i++) {
      if (arr[i].uid == item.uid) {
        found = arr[i];
      } else {
        if (arr[i].children) {
          found = this.findItemInTreeByUid(item, arr[i].children);
        }
      }
    }
    return found;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  selectProperty() {
    this.lastSelectedNode = this.tree.treeModel.getFocusedNode();
    let dialogRef = this.dialog.open(PropertyTreeDialog, {
      data: {
      }
    });
    dialogRef.componentInstance.propertySelected.subscribe(item => {
      this.addProperty(item);
      this.dialogService.showNotification('Параметр "' +
        (item.name ? item.name : item.nameRu) + '" добавлен');
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lastSelectedNode = null;
    });
  }

  addProperty(item) {
    this.addNewItem(this.wrapProperty(item));
    console.log(this.nodes);
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
        name: item.nameRu,
        unit: item.units[0],
        standardAdditionalCondition: null,
        standard: null,
        property: item,
        propertyType: null,
        goodsCategory: null,
        goodsCategoryPropertyValues: [{}]
    }
  }

  onClickOutside(ev) {
    if (ev.value == true) {
      this.tree.treeModel.setFocusedNode(null);
      this.tree.treeModel.setActiveNode(null, null);
    }
  }
  removeChecked(research) {
    let result = research.value;
    let children = [];
    if (research.value.children) {
      research.value.children.forEach(child => {
        children.push(this.removeChecked(child));

      });
      result.children = children;
    }
    return result;
  }

  addNewItem(item) {
    console.log(item);
    if (this.lastSelectedNode) {
      this.insertItemToTree(item, this.lastSelectedNode.data, this.data);
      // let found = this.findItemInTree(this.lastSelectedNode.data.value, this.data.assignmentResearches);
      // found.children.push(this.removeChecked(item));
    } else {
      if (!this.data) {
        this.data = [];
      }
      this.data.push(item);
      // this.data.assignmentResearches.push(this.removeChecked(item));
    }

    this.tree.treeModel.update();
    if (this.wrap) {
      this.wrap.nativeElement.style = "height: auto;";
    }
    if (this.wrap2) {
      this.wrap2.nativeElement.style = "height: auto;";
    }
  }

  removeNode(item) {

    this.removeItemFromTree(item.data, this.data);
    if (item.id) {
      this.onNodeDelete.emit(item.data);
    }
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
}

@Component({
  selector: 'property-tree-dlg',
  templateUrl: './property.tree.dialog.html',
  styleUrls: ['./property.tree.dialog.scss']
})
export class PropertyTreeDialog {
  options: ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChildren(TreeComponent)
  private trees: QueryList<TreeComponent>;
  dialog: MatDialogRef<PropertyTreeDialog>;
  list: Array<any>;
  allList: Array<any>;
  selectedItem: any;
  loaded = false;
  loadedAll = false;
  tabIndex = 0;
  listToView: Array<any> = new Array<any>();
  listMap = {};
//  standards: any;
  customStandard = false;
//  goodId: number;
  param = { placeholder: 'Текст' };
  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() goodsCategoryPropertySelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private stringService: StringService,
    private taxonmyService: TaxonomyService,
    public dialogRef: MatDialogRef<PropertyTreeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
    //this.standards = data.standards;
  //  this.goodId = data.goodId;
    this.customStandard = data.custom;
  }
  selectFromTree(event) {
    this.select(event);
  }

  changeTab(event) {
    this.tabIndex = event;
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
    this.trees[this.tabIndex].treeModel.filterNodes((node) => {
      if (node.data.name.toLowerCase().search(text) >= 0) {
        return true;
      } else {
        return false;
      }
    });
  }
  addNameFilter(name) {
    // name = name.trim();
    // let params = [{ field: 'name', value: name }, { field: 'standard.id', value: this.standards[0].id }, { field: 'goodsCategory.goods.id', value: this.goodId }];
    // this.loaded = false;
    // this.taxonmyService.searchTaxonomyDataByParams('GoodsCategoryProperty', params).subscribe(res => {
    //   this.list = res.content;
    //   this.listToView = this.processData_2(this.list);
    //   this.loaded = true;
    // });
  }

  addNameFilterAll(name) {
    name = name.trim();
    let params = [{ field: 'nameRu', value: name }];
    this.loadedAll = false;
    this.loaded = false;
    this.taxonmyService.searchTaxonomyDataByParams('Property', params).subscribe(res => {
      this.allList = res.content;
      this.loadedAll = true;
      this.loaded = true;
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
      // this.standards.forEach((standard, index) => {
      //   this.taxonmyService.customQuery('goodsCategoryProperty/tree?standardId=' + standard.id + '&goodsId=' + this.goodId)
      //     .subscribe(res => {
      //       this.list = res;
      //       this.listToView = this.processData_2(this.list);
      //       this.listMap[index] = this.listToView;
      //       this.loaded = true;
      //       console.log(this.listMap);
      //     });
      // });
      this.taxonmyService.searchTaxonomyDataByParams('Property', []).subscribe(res => {
        this.allList = res.content;
        this.loadedAll = true;
        this.loaded = true;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
