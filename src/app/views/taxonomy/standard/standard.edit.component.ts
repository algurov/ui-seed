import { Component } from '@angular/core';
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
  selector: 'standard-edit',
  templateUrl: './standard.edit.component.html',
  styleUrls: ['./standard.edit.component.scss']
})
export class StandardEditComponent {
  parent: any;
  validationError = '';
  startDate: any;
  data: any = {};
  stopDate: any;
  fullName: any;
  shortName: any;
  description: any;
  id: number;
  option: any;
  options: Array<any> = new Array<any>();
  subscriptions: Array<any> = new Array<any>();
  constructor(public stringService: StringService,public taxonomyService: TaxonomyService, private route: ActivatedRoute,
    public dialogService: DialogService, private dataService: DataService, private mainService: MainService,
    private router: Router) {
      this.subscriptions.push(this.taxonomyService.loadTaxonomyData('StandardCategory').subscribe(res => {
        this.options = res.content;
      }));
      this.subscriptions.push(this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.taxonomyService.getStandardById(this.id).subscribe(res=> {
           this.data = res;
           this.parent = res.parent;
           this.fullName = this.data.fullName;
           this.shortName = this.data.shortName;
           this.description = this.data.description;
           if (this.data.startDate) {
             this.startDate = new Date(res.startDate);
           }
           if (this.data.stopDate) {
             this.stopDate = new Date(res.stopDate);
           }
           this.option = this.data.standardCategory.id;
           this.dialogService.block = false;
           console.log(this.data);
         });
       }
     }));
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        if (action == 'EDIT_STANDARD') {
          this.save();
        }
        if (action == 'REMOVE_STANDARD') {
          this.remove();
        }
      }));
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  selectParent(event) {
    this.parent = event;
    this.data.parent = event;
  }
  onOptionChange(event) {
    this.option = event.value;
    this.data.standardCategory = this.options.find(item => item.id == this.option);
  }
  onStartDateChange(event){
    this.startDate = event.value;
    this.data.startDate = event.value.getTime();
  }
  onStopDateChange(event){
    this.stopDate = event.value;
    this.data.stopDate = event.value.getTime();
  }
  fullNameChange(event) {
    this.fullName = event.target.value;
    this.data.fullName = this.fullName;
  }
  shortNameChange(event) {
    this.shortName = event.target.value;
    this.data.shortName = this.shortName;
  }
  descriptionChange(event) {
    this.description = event.target.value;
    this.data.description = this.description;
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name: 'STANDARD_EDIT', state: this.id? true:false});
  }

  remove() {
    this.dialogService.showConfirm('Удаление стандарта', 'Подтвердите удаление стандарта').subscribe(res => {
      if (res) {
        this.dialogService.showBlocker();
        this.taxonomyService.deleteStandard(this.data).subscribe(res => {
          this.router.navigate(['main/settings/taxonomy/standard-list']);
          this.dialogService.hideBlocker();
          this.dialogService.showNotification('Стандарт удален');
        });
      }
    });
  }
  beforeSave() {
    if (this.data.parent) {
      if (this.data.parent.children) {
        delete this.data.parent.children;
      }
    }
  }
  checkValidation() {
    let valid = true;
    this.validationError = '';
    if (!this.data.fullName) {
      valid = false;
      this.validationError += 'Полное наименование должно быть указано. '
    }
    if (!this.data.shortName) {
      valid = false;
      this.validationError += 'Краткое наименование должно быть указано. '
    }
    return valid;
  }
  save() {
    if (this.checkValidation()) {
    this.beforeSave();
    console.log(this.data);
    if (this.id) {
      this.taxonomyService.updateStandard(this.data).subscribe(res => {
        this.router.navigate(['main/settings/taxonomy/standard-list']);
        this.dialogService.showNotification('Стандарт сохранен');
      });
    } else {
      this.taxonomyService.createStandard(this.data).subscribe(res => {
        this.router.navigate(['main/settings/taxonomy/standard-list']);
        this.dialogService.showNotification('Стандарт сохранен');
      });
    }
  } else {
    this.dialogService.showMessageDlg('Ошибка валидации', this.validationError);
  }
}
}
