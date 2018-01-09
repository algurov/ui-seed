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
  selector: 'analysis-property-tree',
  templateUrl: './analysis.property.tree.html',
  styleUrls: ['./analysis.property.tree.scss']
})
export class AnalysisPropertyTree {
  lastSelectedNode: any;
  options: ITreeOptions = {
    idField: 'uuid'
  };
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() portion;
  @Input() isInsect: boolean = false;
  valueTotal: number
  @Input() data;
  @Input() isKernel;
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  @ViewChild('wrap') wrap: any;
  //@Input() data: any;
  nodes: Array<any> = new Array<any>()
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private dialogService: DialogService,
    private dataService: DataService, private mainService: MainService) {

  }


  ngOnInit() {
    if (this.data){
        this.initNodes();
    }

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

  // wrapNew(data) {
  //   return {children: [], value: data};
  // }

  calculate(node) {
    // internal nodes get their total from children
    if (node.children.length > 0) {
        node.data.doubleValue = 0;
        for (var i = 0; i < node.children.length; i++) {
            node.data.doubleValue += this.calculate(node.children[i]);
        }
    }
    return node.data.doubleValue;
}

calculateInsect(node) {
  // internal nodes get their total from children
  if (node.children.length > 0) {
      node.data.doubleValue = 0;
      for (var i = 0; i < node.children.length; i++) {
          node.data.doubleValue += +node.children[i].data.additionalAnalysisCardPropertyValues[1].doubleValue;
      }
  }
  return node.data.doubleValue;
}

calculateKernel(node) {
  // internal nodes get their total from children
  if (node.children.length > 0) {
      node.data.doubleValue = 100;
      for (var i = 0; i < node.children.length; i++) {
          node.data.doubleValue += this.getKernelValueForNode(node.children[i]);
      }
  }
  return node.data.doubleValue;
}

getKernelValueForNode(node) {
  if (node.data.additionalAnalysisCardPropertyValues[1].doubleValue) {
    return +node.data.additionalAnalysisCardPropertyValues[1].doubleValue - +node.data.doubleValue;
  } else {
    return +node.data.doubleValue * -1;
  }
}

  onNodeDataChange(event) {
    if(this.isKernel) {
      this.calculateKernel(this.tree.treeModel.getFirstRoot());
      return;
    }
    if (this.isInsect) {
      this.calculateInsect(this.tree.treeModel.getFirstRoot());
    } else {
        this.calculate(this.tree.treeModel.getFirstRoot());
    }
    // let found = null;
    // if (event.value.data.uid) {
    //   found = this.findItemInTreeByUid(event.value, this.nodes);
    // } else {
    //   found = this.findItemInTree(event.value, this.nodes);
    // }
    // if (found) {
    //   found.doubleValue = event.val;
    // }
  }

  initNodes() {
    if (this.data) {
      //this.data.children = [];
      this.nodes.push(this.data);
      //this.nodes = this.data;
      // this.data.assignmentResearches.forEach(item => {
      //   let node = this.wrapNode(item);
      //   this.nodes.push(node);
      // });
    }
    console.log(this.nodes);
    //this.tree.treeModel.update();
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

  selectProperty() {
    this.lastSelectedNode = this.tree.treeModel.getFocusedNode();
    let dialogRef = this.dialog.open(AnalysisPropertyTreeDialog, {
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
  }

  wrapProperty(item) {
    let children = [];
    if (item.children) {
      item.children.forEach(it => {
        children.push(this.wrapProperty(it));
      })
    }
    if (this.isKernel) {
      return {
        children: children,
        additionalAnalysisCardPropertyValues: [
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "NUMBER",
            //   id:1,
            //   name:"Число"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('NUMBER'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          },
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "NORM_BEFORE",
            //   id:17,
            //   name:"Норма до"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('NORM_BEFORE'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          }
      ],
        property: item ,
        textValue: null,
        doubleValue: null
      }
    }
    if(!this.isInsect) {
    return {
      children: children,
        additionalAnalysisCardPropertyValues: [
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "NUMBER",
            //   id:1,
            //   name:"Число"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('NUMBER'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          },
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "PORTION",
            //   id:8,
            //   name:"Навеска"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('PORTION'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          }
      ],
        property: item,
        textValue: null,
        doubleValue: null
    }
  } else {
    return {
      children: children,
        additionalAnalysisCardPropertyValues: [
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "COEFFICIENT",
            //   id:14,
            //   name:"Коэффициент"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('COEFFICIENT'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          },
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "EKZ_KG",
            //   id:15,
            //   name:"Экз\кг"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('EKZ_KG'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          },
          {
            // additionalAnalysisCardProperty: {
            //   descriptor: "SPZ_PEST",
            //   id:16,
            //   name:"СПЗ вредителя"
            // },
            additionalAnalysisCardProperty: this.dataService.getAdditionalAnalysisCardPropertyByDescriptor('SPZ_PEST'),
            booleanValue: false,
            doubleValue: 0,
            textValue: ''
          }
      ],
        property: item,
        textValue: null,
        doubleValue: null
    }
  }
  }

  onClickOutside(ev) {
    if (ev.value == true) {
      this.tree.treeModel.setFocusedNode(null);
      this.tree.treeModel.setActiveNode(null, null);
    }
  }

  addNewItem(item) {
    console.log(item);
    if (this.lastSelectedNode && !this.isInsect && !this.isKernel) {
      this.insertItemToTree(item, this.lastSelectedNode.data, this.nodes);
      if (this.lastSelectedNode.data.additionalAnalysisCardPropertyValues[0]) {
          this.lastSelectedNode.data.additionalAnalysisCardPropertyValues[0].doubleValue = 0;
      }
      if (this.lastSelectedNode.data.additionalAnalysisCardPropertyValues[1]) {
          this.lastSelectedNode.data.additionalAnalysisCardPropertyValues[1].doubleValue = 0;
      }
    } else {
      if (!this.nodes) {
        this.nodes = [];
      }
      this.nodes[0].children.push(item);
    }
    this.tree.treeModel.update();
    if (this.wrap) {
      this.wrap.nativeElement.style = "height: auto;";
    }
    this.dataChange.emit(this.nodes);
  }

  onNodeRemove(event) {
    this.removeItemFromTree(event.node.data, this.nodes);
    this.tree.treeModel.update();
    this.calculate(this.tree.treeModel.getFirstRoot());
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
  selector: 'analysis-property-tree-dlg',
  templateUrl: './analysis.property.tree.dialog.html',
  styleUrls: ['./analysis.property.tree.dialog.scss']
})
export class AnalysisPropertyTreeDialog {
  options: ITreeOptions = {
    idField: 'uuid'
  };
  dialog: MatDialogRef<AnalysisPropertyTreeDialog>;
  allList: Array<any>;
  selectedItem: any;
  loaded = false;
  param = { placeholder: 'Текст' };
  @Output() propertySelected: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private stringService: StringService,
    private taxonmyService: TaxonomyService,
    public dialogRef: MatDialogRef<AnalysisPropertyTreeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
  }

  addNameFilterAll(name) {
    name = name.trim();
    let params = [{ field: 'nameRu', value: name }];
    this.loaded = false;
    this.taxonmyService.searchTaxonomyDataByParams('Property', params).subscribe(res => {
      this.allList = res.content;
      this.loaded = true;
    });
  }

  selectProperty(item) {
    this.propertySelected.emit(item);
  }

  ngOnInit() {
    this.taxonmyService.searchTaxonomyDataByParams('Property', []).subscribe(res => {
      this.allList = res.content;
      this.loaded = true;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
