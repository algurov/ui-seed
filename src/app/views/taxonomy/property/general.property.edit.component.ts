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
  selector: 'general-property-edit',
  templateUrl: './general.property.edit.component.html',
  styleUrls: ['./general.property.edit.component.scss']
})
export class GenaralPropertyEditComponent {

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
        this.taxonomyService.getPropertyById(this.id).subscribe(res => {
          this.data = res;
          console.log(this.data);
          this.dialogService.block = false;
        });
      }
    });
    this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'SAVE_PROPERTY') {
        this.save();
      }
      if (action == 'REMOVE_PROPERTY') {
        this.remove();
      }
    }));
  }

  remove() {
    if (this.id) {
      this.taxonomyService.deleteProperty(this.data).subscribe(res => {
        this.router.navigate(['main/settings/taxonomy/property-list']);
        this.dialogService.showNotification('Показатель удален');
      });
    }
  }
  onUnitsChange(units) {
    this.data.units = units;
  }
  ngOnInit() {
    this.mainService.menuChange.emit({ name: 'PROPERTY_EDIT', state: this.id ? true : false });
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
        this.taxonomyService.updateProperty(this.data).subscribe(res => {
          this.dialogService.hideBlocker();
          this.dialogService.showNotification('Показатель "'+ this.data.nameRu + '" сохранен');
          this.router.navigate(['main/settings/taxonomy/property-list']);
        });
      } else {
        this.taxonomyService.createProperty(this.data).subscribe(res => {
          this.dialogService.hideBlocker();
          this.dialogService.showNotification('Показатель "'+ this.data.nameRu + '" сохранен');
          this.router.navigate(['main/settings/taxonomy/property-list']);
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
