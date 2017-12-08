import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxonomyService } from '../../../services/taxonomy.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../../services/dialog.service';
import { StringService } from '../../../services/string.service';
import { MainService } from '../../../services/main.service';
import { TreeComponent } from 'angular2-tree-component';

@Component({
  selector: 'standard-list',
  templateUrl: './standard.list.component.html',
  styleUrls: ['./standard.list.component.scss']
})
export class StandardListComponent {
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  @ViewChild(TreeComponent) tree: TreeComponent;
  constructor(
    private stringService: StringService,
    private taxonomyService: TaxonomyService,
    private router: Router,
    private mainService: MainService,
    private dialogService: DialogService
    ) {
      this.dialogService.showBlocker();
      this.taxonomyService.getStandardList().subscribe(res => {
        this.list = this.processData(res.content);
        this.loaded = true;
        this.dialogService.hideBlocker();
      });
      this.mainService.menuActionPerformed.subscribe(action => {
        if (action == 'ADD_STANDARD') {
          this.router.navigate(['main/settings/taxonomy/standard']);
        }
      });
   }

   processData(list) {

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

   addNameFilter(name) {
     name = name.trim();
     this.tree.treeModel.filterNodes((node) => {
       if (node.data.fullName.toLowerCase().search(name) >= 0) {
         return true;
       } else {
         return false;
       }
     });
   }

   selectItem(item) {
     if (item) {
      this.selectedItem = item;
      this.router.navigate(['main/settings/taxonomy/standard/'+ this.selectedItem.id]);
    } else {
    }
   }

   selectItemForProperty(item) {
     if (item) {
      //this.selectedItem = item;
      this.router.navigate(['main/settings/taxonomy/standard/'+ item.id+ '/property']);
    } else {
    }
   }

   ngOnInit() {

     this.mainService.menuChange.emit({name: 'STANDARD_LIST', state: false});
   }

}
