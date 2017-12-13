import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent {
  id: number;
  data: any = {
  };
  subscriptions = [];
  validationError = '';
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        if (action == "SAVE_DIRECTION") {
          this.save();
        }
        if (action == 'SIGN_DIRECTION') {
          this.dialogService.showSignDialog(this.id, 'ASSIGNMENT');
        }
      }));
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getAssignmentById(this.id).subscribe(res=> {
           this.data = res;
           console.log(this.data);
           this.mainService.directionLoaded.emit(this.data);
           this.dialogService.block = false;
         });
       }
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name: 'DIRECTION_EDIT', state: this.id? true: false});
  }

  removeUid(arr) {
      arr.forEach(item => {
        delete item.uid;
        if (item.children) {
          this.removeUid(item.children);
        }
      });
  }

  beforeSave() {
    if (this.data.assignmentResearches) {
      if (this.data.assignmentResearches.length > 0) {
        this.removeUid(this.data.assignmentResearches);
      }
    }
  }
  checkValidation() {
    let valid = true;
    this.validationError = '';
    if (!this.data.number) {
      this.validationError += 'Номер документа должен быть указан. ';
      valid = false;
    }
    if (!this.data.date) {
      this.validationError += 'Дата создания должна быть указана. ';
      valid = false;
    }
    if (!this.data.laboratory) {
      this.validationError += 'Лаборатория должна быть указана. ';
      valid = false;
    }
    if (!this.data.dateByWhen) {
      this.validationError += 'Срок исполнения должен быть указан. ';
      valid = false;
    }
    if (!this.data.goods) {
      this.validationError += 'Продукт должен быть указан. ';
      valid = false;
    }
    if (!this.data.act) {
      this.validationError += 'Акт отбора пробы должен быть указан. ';
      valid = false;
    }
    if (this.data.standards.length == 0) {
      this.validationError += 'Стандарт должен быть указан. ';
      valid = false;
    }
    if (this.data.assignmentResearches.length == 0) {
      this.validationError += 'Параметры должены быть указаны. ';
      valid = false;
    }
    return valid;
  }
  save() {
    if (this.checkValidation()) {
    this.beforeSave();
    this.dialogService.showBlocker();
    console.log('toSave');
    console.log(this.data);
    this.documentService.updateAssignment(this.data).subscribe(res => {
      this.data = res;
      console.log('response');
      console.log(this.data);
      this.documentService.getApplicationByActId(this.data.act.id).subscribe(r => {
        this.dialogService.hideBlocker();
        this.router.navigate(['main/document/application/' + r.id + '/view']);
        this.dialogService.showNotification('Направление сохранено');
      });

    });
  } else {
    this.dialogService.showMessageDlg('Ошибка валидации', this.validationError);
  }
  }
}
