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
@Component({
  selector: 'unit-edit',
  templateUrl: './unit.edit.component.html',
  styleUrls: ['./unit.edit.component.scss']
})
export class UnitEditComponent {

  goodsCategory: any;
  id: number;
  data :any ={};
  validationError = '';
  isNew = true;
  toDelete: Array<any> = new Array<any>();
  goodsCategoryProperties: Array<any> = new Array<any>();
  toSave: Array<any> = new Array<any>();
  toCreate: Array<any> = new Array<any>();
  toUpdate: Array<any> = new Array<any>();
  subscriptions = [];
  taxonomyParams = [];
  constructor(public stringService: StringService, public taxonomyService: TaxonomyService, private route: ActivatedRoute,
    public dialogService: DialogService, private dataService: DataService, private mainService: MainService,
    private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.dialogService.block = true;
        this.id = +params['id'];
        this.taxonomyService.getUnitById(this.id).subscribe(res => {
          this.data = res;
          console.log(this.data);
          this.dialogService.block = false;
        });
      }
    });
    this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'SAVE_UNIT') {
        this.save();
      }
      if (action == 'REMOVE_UNIT') {
        this.remove();
      }
    }));
  }

  remove() {
    if (this.id) {
      this.dialogService.showConfirm('Подтвердите удаление', 'Подтвердите удаление ед. измерения').subscribe(res => {
        if (res) {
          this.taxonomyService.deleteUnit(this.data).subscribe(res => {
            this.router.navigate(['main/settings/taxonomy/unit-list']);
            this.dialogService.showNotification('Ед. измерения удалена');
          });
        }
      });
    }
  }
  onUnitsChange(units) {
    this.data.units = units;
  }
  ngOnInit() {
    this.mainService.menuChange.emit({ name: 'UNIT_EDIT', state: this.id ? true : false });
  }

  checkValidation() {
    let valid = true;
    if (!this.data.nameRu) {
      valid = false;
      this.validationError = 'Наименование должно быть указано';
    }
    return valid;
  }
  save() {
    if (this.checkValidation()) {
      this.dialogService.showBlocker();
      if (this.id) {
        this.taxonomyService.updateUnit(this.data).subscribe(res => {
          this.dialogService.hideBlocker();
          this.dialogService.showNotification('Ед. измерения сохранена');
          this.router.navigate(['main/settings/taxonomy/unit-list']);
        });
      } else {
        this.taxonomyService.createUnit(this.data).subscribe(res => {
          this.dialogService.hideBlocker();
          this.dialogService.showNotification('Ед. измерения сохранена');
          this.router.navigate(['main/settings/taxonomy/unit-list']);
        });
      }
    } else {
      this.dialogService.showMessageDlg('Ошибка валидации', this.validationError);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
