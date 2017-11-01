import { Component, Input, ViewChild } from '@angular/core';
import { TreeComponent, ITreeOptions } from 'angular2-tree-component';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'tree-product',
  templateUrl: './tree.product.component.html',
  styleUrls: ['./tree.product.component.scss']
})
export class TreeProductComponent {
  options : ITreeOptions = {
    idField: 'uuid'
  };
  @Input() config: any;
  nodes: Array<any> = new Array<any>();
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  constructor(private mainService: MainService) {
    this.mainService.productParamAdded.subscribe(item => this.addNewItem(item));
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
