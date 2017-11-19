import { Component, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { TreeComponent } from 'angular2-tree-component';
import { DialogService } from '../../../../services/dialog.service';
import { DataService } from '../../../../services/data.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular2-tree-component';

@Component({
  selector: 'param-tree',
  templateUrl: './param.tree.html',
  styleUrls: ['./param.tree.scss']
})
export class ParamTree {
  lastSelectedNode :any;
  options : ITreeOptions = {
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
  nodes: Array<any> = new Array<any>()
  properties: Array<any> = new Array<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  visible: boolean = true;
  constructor(private dialog: MatDialog, private dialogService: DialogService,
    private dataService: DataService, private mainService: MainService) {
      this.mainService.directionLoaded.subscribe(item => {
        this.data = item;
        console.log(this.data);
        this.initNodes();
      });
      this.mainService.standardChecked.subscribe(item => {
        if (item.checked) {
          this.addStandardNodes(item.standard);
          //this.nodes = this.nodes.filter(it => it.value.applicationResearch.goodsCategoryProperty.standard.id == item.standard.id);
        } else {
          this.nodes = this.nodes.filter(it => it.value.applicationResearch.goodsCategoryProperty.standard.id != item.standard.id);
        }
        this.tree.treeModel.update();
      });
     }

  addStandardNodes(standard) {

    this.data.application.applicationStandardResearches.forEach(item => {
      if (!item.customContract) {
        item.applicationResearches.forEach(it => {
          if (it.goodsCategoryProperty.standard.id == standard.id) {
            let node = this.wrapNode(it);
            this.nodes.push(node);
          }
        });
      }
    });

  this.tree.treeModel.update();
}

  ngOnInit() {

  }

  unwrap(node) {
    let result = node.value;
    if (result.propertyType) {
    delete result.propertyType;
    let children = [];
    if(result.children) {
        result.children.forEach(child => {
            children.push(this.unwrap(child));
        });
    }
    result.children = children;
    }
    return result;
  }

  onNodeStandardChange(event) {
      if (event.standard) {
        let found = this.findItemInTree(event.value.data.value.applicationResearch, this.data.assignmentResearches);
        if (found) {
          found.standard = event.standard;
        }
      }
  }

  onNodeValueChange(event) {
      let found = this.findItemInTree(event.value.data.value.applicationResearch, this.data.assignmentResearches);
      if (found) {
        found.value = event.val;
      }
  }

  onNodeTextValueChange(event) {
      let found = this.findItemInTree(event.value.data.value.applicationResearch, this.data.assignmentResearches);
      if (found) {
        found.textValue = event.val;
      }
  }

  onNodeStateChange(event) {
    let unwrapped = this.unwrap(event.value.data);
      if (event.checked) {
          if(event.value.parent.data.virtual) {
            this.data.assignmentResearches.push(unwrapped);
          } else {
            this.addWithParent(event.value, unwrapped);
          }
      } else {
        if(event.value.parent.data.virtual) {
          let index = this.data.assignmentResearches.findIndex(item => item.applicationResearch.id == unwrapped.applicationResearch.id);
          if (index >= 0) {
            this.data.assignmentResearches.splice(index, 1);
          }
        } else {
          this.removeFromParent(event.value);
        }

      }
      console.log(this.data.assignmentResearches);
  }

  removeFromParent(node) {
    let parent = node.parent.data.value.applicationResearch;
    let found = this.findItemInTree(parent, this.data.assignmentResearches);
    if (found) {
      let index = found.children.findIndex(item => item.applicationResearch.id == node.data.value.applicationResearch.id);
      if (index >= 0) {
        found.children.splice(index, 1);
      }
    }
  }

  addWithParent(node, value) {
    let path = node.path;
    let parentArray = [];
    path.forEach(pathItem => {
      parentArray.push(this.tree.treeModel.getNodeById(pathItem));
    });
    this.addAssignmentResearchWithParents(parentArray, value, null);
  }

  addAssignmentResearchWithParents(parentArray, value, parent) {
    if (parentArray.length > 0) {
      if (parentArray.length > 1) {
        let item = parentArray[0];
        parentArray.splice(0, 1);
        let val = null;
        val = this.unwrap(item.data);

        let found = null;
        if (parent) {
          found = this.findItemInTree(val.applicationResearch, parent.children);
        } else {
          found = this.findItemInTree(val.applicationResearch, this.data.assignmentResearches);
        }
        if (!found) {
          if (parent) {
            parent.children.push(val);
          } else {
            this.data.assignmentResearches.push(val);
          }
          found = val;
        }
        this.addAssignmentResearchWithParents(parentArray, value, found);
      } else {
        if (parent) {
          parent.children.push(value);
        } else {
          this.data.assignmentResearches.push(value);
        }
      }
    } else {
      return;
    }

  }
  initNodes() {
    if (this.data && this.data.application) {
    this.data.application.applicationStandardResearches.forEach(item => {
      if (!item.customContract) {
        item.applicationResearches.forEach(it => {
          let node = this.wrapNode(it);
          this.nodes.push(node);
        });
      }
    });
  }
  this.tree.treeModel.update();
}

  wrapNode(applicationResearch) {
    let children = [];
    let checked = false;
    applicationResearch.children.forEach(child => {
      children.push(this.wrapNode(child));
    });

  //  let found = this.data.assignmentResearches.find(item => item.applicationResearch.id == applicationResearch.id);
  // let found = this.findItemInTree(applicationResearch, this.data.assignmentResearches);
   //console.log(found);
   let found = this.findItemInTree(applicationResearch, this.data.assignmentResearches);
    if (found) {
      checked = true;
    }
    return {
      checked: checked,
      children: children,
      value: {
        applicationResearch: applicationResearch,
        standard: found? found.standard: null,
        textValue: found? found.textValue: null,
        value: found? found.value: null
      }
    }
  }

  findItemInTree(item, arr: Array<any>) {
    let found = null;
    for (let i = 0; i < arr.length && !found; i++) {
      if (arr[i].applicationResearch.id == item.id) {
        found = arr[i];
      } else {
        if (arr[i].children) {
          found = this.findItemInTree(item, arr[i].children);
        }
      }
    }
    return found;
  }

  toggleVisible() {
    this.visible = ! this.visible;
  }

  selectProperty() {
    this.lastSelectedNode = this.tree.treeModel.getFocusedNode();
    let dialogRef = this.dialog.open(ParamTreeDialog, {
      data: {
        standards: this.assignment.standards,
        goodId: this.data.goods.id
      }
    });
    dialogRef.componentInstance.propertySelected.subscribe(item => {
      //delete item.uuid;
      //delete item.children;
      this.addProperty(item);
      this.dialogService.showNotification('Параметр "' +
        (item.name ? item.name : item.nameRu) + '" добавлен');
    });
    dialogRef.componentInstance.goodsCategoryPropertySelected.subscribe(item => {
      // delete item.uuid;
      // delete item.children;
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
    delete item.uuid;
    delete item.children;
    return {
      children: children,
      goodsCategoryProperty: item
    }
  }

onClickOutside(ev) {
  if(ev.value == true) {
    this.tree.treeModel.setFocusedNode(null);
    this.tree.treeModel.setActiveNode(null, null);
  }
}
  addNewItem(item) {
    // if (this.lastSelectedNode) {
    //   this.insertItemToTree(item, this.lastSelectedNode.data, this.applicationStandartResearch.applicationResearches);
    // } else {
    //   if (!this.applicationStandartResearch.applicationResearches) {
    //     this.applicationStandartResearch.applicationResearches = [];
    //   }
    //   this.applicationStandartResearch.applicationResearches.push(item);
    // }
    // this.tree.treeModel.update();
    // if (this.wrap) {
    //   this.wrap.nativeElement.style = "height: auto;";
    // }
    // if (this.wrap2) {
    //   this.wrap2.nativeElement.style = "height: auto;";
    // }


  }

  removeItem(item) {
    console.log(item.data);
    //this.removeItemFromTree(item.data, this.applicationStandartResearch.applicationResearches);
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
  selector: 'param-tree-dlg',
  templateUrl: './param.tree.dialog.html',
  styleUrls: ['./param.tree.dialog.scss']
})
export class ParamTreeDialog {
  options : ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  dialog: MatDialogRef<ParamTreeDialog>;
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
    public dialogRef: MatDialogRef<ParamTreeDialog>,
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
      // let params = [{ field: 'standard.id', value: this.standard.id }, { field: 'goodsCategory.goods.id', value: this.data.goodId }];
      // this.taxonmyService.searchTaxonomyDataByParams('GoodsCategoryProperty', params).subscribe(res => {
      //
      //   this.list = res.content;
      //     console.log(this.list);
      //   this.listToView = this.processData_2(this.list);
      //   console.log(this.listToView);
      //   this.loaded = true;
      // });
      this.taxonmyService.customQuery('goodsCategoryProperty/tree?standardId='+ this.standard.id + '&goodsId=' + this.goodId)
        .subscribe(res => {
          this.list = res;
          this.listToView = this.processData_2(this.list);
          this.loaded = true;
        });
    }
    this.taxonmyService.searchTaxonomyDataByParams('Property', []).subscribe(res => {
      this.allList = res.content;
      this.loadedAll = true;
      this.loaded = true;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
