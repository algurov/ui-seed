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
  selector: 'param-tree',
  templateUrl: './param.tree.html',
  styleUrls: ['./param.tree.scss']
})
export class ParamTree {
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
  nodes: Array<any> = new Array<any>()
  properties: Array<any> = new Array<any>();
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  visible: boolean = true;
  constructor(private dialog: MatDialog, private dialogService: DialogService,
    private dataService: DataService, private mainService: MainService) {
    this.mainService.directionLoaded.subscribe(item => {
      this.data = item;
      this.initNodes();
    });
    // this.mainService.standardChecked.subscribe(item => {
    //   if (item.checked) {
    //     if (item.standard['@c']=='.CustomContract') {
    //       this.addStandardNodes(item.standard);
    //     } else {
    //       this.addStandardNodes(item.standard);
    //     }
    //   } else {
    //     this.nodes = this.nodes.filter(it => {
    //       if (it.source != 'custom') {
    //         if (it.source['@c'] != ".CustomContract") {
    //           return  it.source.id != item.standard.id;
    //         } else {
    //           if (item.standard.id != it.source.id) return true;
    //         }
    //
    //       }
    //
    //     });
    //   }
    //   this.tree.treeModel.update();
    // });
  }

  //   addStandardNodes(standard) {
  //     this.data.application.applicationStandardResearches.forEach(item => {
  //     if (!item.customContract) {
  //         item.applicationResearches.forEach(it => {
  //           if (it.goodsCategoryProperty.standard.id == standard.id) {
  //             let node = this.wrapNode(it);
  //             this.nodes.push(node);
  //           }
  //         });
  //       } else {
  //         item.applicationResearches.forEach(it => {
  //           if (it.property) {
  //             let node = this.wrapNode(it);
  //             this.nodes.push(node);
  //           }
  //         });
  //       }
  //     });
  //
  //   this.tree.treeModel.update();
  // }

  ngOnInit() {

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

  onNodeStandardChange(event) {
    if (event.standard) {
      let found = null;
      if (event.value.data.value.uid) {
        found = this.findItemInTreeByUid(event.value.data.value, this.data.assignmentResearches);
      } else {
        found = this.findItemInTree(event.value.data.value, this.data.assignmentResearches);
      }
      if (found) {
        found.standard = event.standard;
      }
    }
  }

  onNodeValueChange(event) {
    let found = null;
    if (event.value.data.value.uid) {
      found = this.findItemInTreeByUid(event.value.data.value, this.data.assignmentResearches);
    } else {
      found = this.findItemInTree(event.value.data.value, this.data.assignmentResearches);
    }
    if (found) {
      found.value = event.val;
    }
  }

  onNodeTextValueChange(event) {
    let found = null;
    if (event.value.data.value.uid) {
      found = this.findItemInTreeByUid(event.value.data.value, this.data.assignmentResearches);
    } else {
      found = this.findItemInTree(event.value.data.value, this.data.assignmentResearches);
    }
    if (found) {
      found.textValue = event.val;
    }
  }

  onNodeStateChange(event) {
    console.log(event);
    let unwrapped = this.unwrapNew(event.value);
    if (event.checked) {
      if (event.value.parent.data.virtual) {
        let found = null;
        if (event.value.data.value.uid) {
          found = this.findItemInTreeByUid(event.value.data.value, this.data.assignmentResearches);
        } else {
          found = this.findItemInTree(event.value.data.value, this.data.assignmentResearches);
        }
      //  let found = this.data.assignmentResearches.find(item => item.id == unwrapped.id);
        found.visibleForLaboratory = event.checked;
      } else {
        this.selectWithParent(event.value, unwrapped);
      }

    } else {
      let found = null;
      if (event.value.data.value.uid) {
        found = this.findItemInTreeByUid(event.value.data.value, this.data.assignmentResearches);
      } else {
        found = this.findItemInTree(event.value.data.value, this.data.assignmentResearches);
      }
      //let found = this.data.assignmentResearches.find(item => item.id == unwrapped.id);
      if (found) {
        found.visibleForLaboratory = false;
        this.deselectAllChildren(found);
      }

    }
    //  let unwrapped = this.unwrap(event.value.data);
    // if (event.checked) {
    //     if(event.value.parent.data.virtual) {
    //       this.data.assignmentResearches.push(unwrapped);
    //     } else {
    //       this.addWithParent(event.value, unwrapped);
    //     }
    // } else {
    //   if(event.value.parent.data.virtual) {
    //     let index = this.data.assignmentResearches.findIndex(item => item.applicationResearch.id == unwrapped.applicationResearch.id);
    //     if (index >= 0) {
    //       this.data.assignmentResearches.splice(index, 1);
    //     }
    //   } else {
    //     this.removeFromParent(event.value);
    //   }
    //
    // }
    console.log(this.data.assignmentResearches);
  }
  deselectAllChildren(assignmentResearch) {
    assignmentResearch.children.forEach(child => {
      child.visibleForLaboratory = false;
      if (child.children.length > 0) {
        this.deselectAllChildren(child);
      }
    });
  }
  // removeFromParent(node) {
  //   let parent = node.parent.data.value.applicationResearch;
  //   let found = this.findItemInTree(parent, this.data.assignmentResearches);
  //   if (found) {
  //     let index = found.children.findIndex(item => item.applicationResearch.id == node.data.value.applicationResearch.id);
  //     if (index >= 0) {
  //       found.children.splice(index, 1);
  //     }
  //   }
  // }

  // addWithParent(node, value) {
  //   let path = node.path;
  //   let parentArray = [];
  //   path.forEach(pathItem => {
  //     parentArray.push(this.tree.treeModel.getNodeById(pathItem));
  //   });
  //   this.addAssignmentResearchWithParents(parentArray, value, null);
  // }

  selectWithParent(node, value) {
    let path = node.path;
    let parentArray = [];
    path.forEach(pathItem => {
      parentArray.push(this.tree.treeModel.getNodeById(pathItem));
    });
    this.selectAssignmentResearchWithParents(parentArray);
  }

  selectAssignmentResearchWithParents(parentArray) {
    parentArray.forEach(item => {
      let found = null;
      if (item.data.value.uid) {
        found = this.findItemInTreeByUid(item.data.value, this.data.assignmentResearches);
      } else {
        found = this.findItemInTree(item.data.value, this.data.assignmentResearches);
      }
      found.visibleForLaboratory = true;
    });
  }

  // addAssignmentResearchWithParents(parentArray, value, parent) {
  //   if (parentArray.length > 0) {
  //     if (parentArray.length > 1) {
  //       let item = parentArray[0];
  //       parentArray.splice(0, 1);
  //       let val = null;
  //       val = this.unwrap(item.data);
  //
  //       let found = null;
  //       if (parent) {
  //         found = this.findItemInTree(val.applicationResearch, parent.children);
  //       } else {
  //         found = this.findItemInTree(val.applicationResearch, this.data.assignmentResearches);
  //       }
  //       if (!found) {
  //         if (parent) {
  //           parent.children.push(val);
  //         } else {
  //           this.data.assignmentResearches.push(val);
  //         }
  //         found = val;
  //       }
  //       this.addAssignmentResearchWithParents(parentArray, value, found);
  //     } else {
  //       if (parent) {
  //         parent.children.push(value);
  //       } else {
  //         this.data.assignmentResearches.push(value);
  //       }
  //     }
  //   } else {
  //     return;
  //   }
  //
  // }
  initNodes() {
    if (this.data) {
      this.data.assignmentResearches.forEach(item => {
        let node = this.wrapNode(item);
        this.nodes.push(node);
      });


      // this.data.application.applicationStandardResearches.forEach(item => {
      //   if (!item.customContract) {
      //     item.applicationResearches.forEach(it => {
      //       let node = this.wrapNode(it, item.standard);
      //       this.nodes.push(node);
      //     });
      //   } else {
      //     item.applicationResearches.forEach(it => {
      //       let node = this.wrapNode(it, item.customContract);
      //       this.nodes.push(node);
      //     });
      //   }
      // });
    }
    console.log(this.nodes);
    this.tree.treeModel.update();
  }

  wrapNode(assignmentResearch) {
    let children = [];
    let checked = false;
    assignmentResearch.children.forEach(child => {
      children.push(this.wrapNode(child));
    });

    //  let found = this.data.assignmentResearches.find(item => item.applicationResearch.id == applicationResearch.id);
    // let found = this.findItemInTree(applicationResearch, this.data.assignmentResearches);
    //console.log(found);
    //let found = this.findItemInTree(applicationResearch, this.data.assignmentResearches);
    //if (found) {
    //  checked = true;
    //}
    return {
      checked: assignmentResearch.visibleForLaboratory,
      children: children,
      value: assignmentResearch
    }
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
    let dialogRef = this.dialog.open(ParamTreeDialog, {
      data: {
        standards: this.data.standards,
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

  addGoodsCategoryProperty(item) {
    this.addNewItem(this.wrapGoodsCategoryProperty(item, item.standard));

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
      checked: false,
      children: children,
      value: {
        uid: Math.random(),
        customName: null,
        minValue: null,
        maxValue: null,
        customText: null,
        researchCondition: null,
        property: item,
        children: children,
        goodsCategoryProperty: null,
        textValue: null,
        value: null
      }
    }
  }

  wrapGoodsCategoryProperty(item, source) {
    let children = [];
    if (item.children) {
      item.children.forEach(it => {
        children.push(this.wrapGoodsCategoryProperty(it, source));
      })
    }
    delete item.uuid;
    delete item.children;
    return {
      checked: false,
      children: children,
      value: {
        uid: Math.random(),
        customName: null,
        minValue: null,
        maxValue: null,
        customText: null,
        researchCondition: null,
        property: null,
        children: children,
        goodsCategoryProperty: item,
        textValue: null,
        value: null
      }
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
      this.insertItemToTree(item, this.lastSelectedNode.data, this.nodes);
      let found = this.findItemInTree(this.lastSelectedNode.data.value, this.data.assignmentResearches);
      found.children.push(this.removeChecked(item));
    } else {
      if (!this.nodes) {
        this.nodes = [];
      }
      this.nodes.push(item);
      this.data.assignmentResearches.push(this.removeChecked(item));
    }
    this.tree.treeModel.update();
    if (this.wrap) {
      this.wrap.nativeElement.style = "height: auto;";
    }
    if (this.wrap2) {
      this.wrap2.nativeElement.style = "height: auto;";
    }

    console.log(this.data.assignmentResearches);
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
  options: ITreeOptions = {
    idField: 'uuid'
  };
  @ViewChildren(TreeComponent)
  private trees: QueryList<TreeComponent>;
  dialog: MatDialogRef<ParamTreeDialog>;
  list: Array<any>;
  allList: Array<any>;
  selectedItem: any;
  loaded = false;
  loadedAll = false;
  tabIndex = 0;
  listToView: Array<any> = new Array<any>();
  listMap = {};
  standards: any;
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
    this.standards = data.standards;
    this.goodId = data.goodId;
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
    name = name.trim();
    let params = [{ field: 'name', value: name }, { field: 'standard.id', value: this.standards[0].id }, { field: 'goodsCategory.goods.id', value: this.goodId }];
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
      this.standards.forEach((standard, index) => {
        this.taxonmyService.customQuery('goodsCategoryProperty/tree?standardId=' + standard.id + '&goodsId=' + this.goodId)
          .subscribe(res => {
            this.list = res;
            this.listToView = this.processData_2(this.list);
            this.listMap[index] = this.listToView;
            this.loaded = true;
            console.log(this.listMap);
          });
      });
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
