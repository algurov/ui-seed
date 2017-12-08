import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxonomyService } from '../../../services/taxonomy.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../../services/dialog.service';
import { StringService } from '../../../services/string.service';
import { DataService } from '../../../services/data.service';
import { MainService } from '../../../services/main.service';
import { PropertyTree } from './property.tree/property.tree';
@Component({
  selector: 'sproperty-edit',
  templateUrl: './property.edit.component.html',
  styleUrls: ['./property.edit.component.scss']
})
export class PropertyEditComponent {
  @ViewChild(PropertyTree) propertyTree: PropertyTree;
  goodsCategory: any;
  id: number;
  data = { id: -1 };
  isNew = true;
  toDelete: Array<any> = new Array<any>();
  goodsCategoryProperties: Array<any> = new Array<any>();
  toSave: Array<any> = new Array<any>();
  toCreate: Array<any> = new Array<any>();
  toUpdate: Array<any> = new Array<any>();
  subscriptions = [];
  constructor(public stringService: StringService, public taxonomyService: TaxonomyService, private route: ActivatedRoute,
    public dialogService: DialogService, private dataService: DataService, private mainService: MainService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.dialogService.block = true;
        this.id = +params['id'];
        this.taxonomyService.getStandardById(this.id).subscribe(res => {
          this.data = res;
          this.dialogService.block = false;
        });
      }
    });
    this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'EDIT_STANDARD_PROPERTY') {
        this.save();
      }
    }));
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

  treeToArray(treeArray, parent) {
    treeArray.forEach(node => {
      let children = [];
      node.parent = parent;
      if (node.children) {
        children = node.children;
      }
      delete node.children;
      this.toSave.push(node);
      this.treeToArray(children, node);
    });
  }

  onNodeDelete(node) {
    this.toDelete.push(node);
  }

  selectGoodsCategory(event) {
    this.goodsCategory = event;
    this.dialogService.showBlocker();
    this.taxonomyService.getGoodsCategoryPropertyByStandardIdAndGoodsCategoryId(this.data.id, this.goodsCategory.id).subscribe(res => {
      if (res.content.length > 0) {
        this.isNew = false;
      }
      this.goodsCategoryProperties = this.processData_2(res.content);
      this.dialogService.hideBlocker();
      console.log(this.goodsCategoryProperties);
    });

  }
  ngOnInit() {
    this.mainService.menuChange.emit({ name: 'STANDARD_PROPERTY_EDIT', state: this.id ? true : false });
  }

  beforeSave() {
    this.treeToArray(this.propertyTree.data, null);
    this.toSave.forEach(item => {
      delete item.uuid;
      item.goodsCategory = this.goodsCategory;
      delete item.goodsCategory.children;
      item.standard = this.data;
      delete item.standard.children;
    });
    this.toSave.forEach(item => {
      if (item.id) {
        this.toUpdate.push(item);
      } else {
        this.toCreate.push(item);
      }
    });
  }

  save() {
    if (this.goodsCategory == null) {
      this.dialogService.showMessageDlg('Ошибка валидации', 'Поле категории обязательно к заполнению');
    } else {
      this.beforeSave();
      this.taxonomyService.createProperties(this.toCreate).subscribe(res => {
        this.taxonomyService.updateProperties(this.toUpdate).subscribe(res1 => {
          this.toDelete.forEach(toDel => {
            this.taxonomyService.deleteGoodsCategoryProperty(toDel.id).subscribe(res2 => {});
          });
          this.router.navigate(['main/settings/taxonomy/standard-list']);
          this.dialogService.showNotification('Стандарт сохранен');
        });
      });
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
