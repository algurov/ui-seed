import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxonomyService } from '../../../services/taxonomy.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../../services/dialog.service';
import { StringService } from '../../../services/string.service';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'unit-list',
  templateUrl: './unit.list.component.html',
  styleUrls: ['./unit.list.component.scss']
})
export class UnitListComponent {
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  constructor(
    private stringService: StringService,
    private taxonomyService: TaxonomyService,
    private router: Router,
    private mainService: MainService,
    private dialogService: DialogService
  ) {
    this.dialogService.showBlocker();
    this.taxonomyService.getUnitList().subscribe(res => {
      this.list = res.content;
      console.log(this.list);
      this.dialogService.hideBlocker();
    });
    this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'ADD_UNIT') {
        this.router.navigate(['main/settings/taxonomy/unit']);
      }
    });
  }

  addNameFilter(name) {
    name = name.trim();
    this.taxonomyService.searchUnitByName(name.toLowerCase()).subscribe(res => {
      this.list = res.content;
    });
  }

  selectItem(item) {
    if (item) {
      this.selectedItem = item;
      this.router.navigate(['main/settings/taxonomy/unit/' + this.selectedItem.id]);
    } else {
    }
  }

  ngOnInit() {

    this.mainService.menuChange.emit({ name: 'UNIT_LIST', state: false });
  }

}
