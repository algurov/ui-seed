import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { MainService } from '../../../../services/main.service';
import { TreeComponent } from 'angular2-tree-component';
@Component({
  selector: 'goods-category-node',
  templateUrl: './goods.category.node.html',
  styleUrls: ['./goods.category.node.scss']
})
export class GoodsCategoryNode {
  @Input() config: any;
  @Input() tree: TreeComponent;
  @Output() stateChange: EventEmitter<any> = new EventEmitter<any>();
  data: any = {};
  constructor(private dataService: DataService, private mainService: MainService) {
  }

  ngOnInit() {

  }

  onCheckChange(event) {
    if (event.checked) {
      this.selectInRoot(this.config);
    } else {
      this.config.data.checked = false;
    }
      this.tree.treeModel.update();
      this.stateChange.emit({checked: event.checked, node: this.config});
  }

  selectInRoot(node) {
    let root = this.tree.treeModel.getNodeById(node.path[0]);
    this.deselectAllChildren(root);
    node.data.checked = true;
  }

  deselectAllChildren(node) {
    node.data.checked = false;
    if (node.children) {
      node.children.forEach(child => {
        this.deselectAllChildren(child);
      });
    }
  }


  isCheckboxVisible() {
    if (this.config.children.length == 0) {
      return true;
    }
    return false;
  }

  collectData() {
    //this.data.selectedOption = this.selectedOption;
    return this.data;
  }

}
