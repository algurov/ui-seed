import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent {
  id: number;
  validationError = '';
  data: any = {
  };
  subscriptions = [];
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        if (action == 'SAVE_ACT') {
          this.save();
        }
        if (action == 'SIGN_ACT') {
          this.dialogService.showSignDialog(this.id, 'ACT');
        }
      }));
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getActById(this.id).subscribe(res=> {
           this.data = res;
           this.mainService.actLoaded.emit(this.data);
           this.dialogService.block = false;
         });
       }
      });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name:'ACT_EDIT', state: this.id? true: false});
  }

  beforeSave() {
    if (this.data.agents) {
      if (this.data.agents.length > 0) {
        this.data.agents.forEach(item => {
          delete item.guid;
        });
      }
    }
  }

  checkValidation() {
    let valid = true;
    this.validationError = '';
    if (!this.data.sampleNumber) {
      this.validationError += 'Номер акта отбора проб должен быть указан. ';
      valid = false;
    }
    if (!this.data.actDate) {
      this.validationError += 'Дата создания должна быть указана. ';
      valid = false;
    }
    if (!this.data.samplingLaboratory) {
      this.validationError += 'Лаборатория должна быть указана. ';
      valid = false;
    }
    if (!this.data.placeDrawingUpAct) {
      this.validationError += 'Место составления акта должно быть указано. ';
      valid = false;
    }
    if (!this.data.authorizedPersonName) {
      this.validationError += 'Уполномоченное лицо должно быть указано. ';
      valid = false;
    }
    if (!this.data.goods) {
      this.validationError += 'Продукт должен быть указан. ';
      valid = false;
    }
    if (!this.data.analyzingLaboratory) {
      this.validationError += 'Лаборатория должна быть указана. ';
      valid = false;
    }
    return valid;
  }
  save() {
    if (this.checkValidation()) {
    this.beforeSave();
    this.dialogService.showBlocker();
    console.log(this.data);
    this.documentService.updateAct(this.data).subscribe(res => {
      this.data = res;
      this.documentService.getApplicationByActId(this.data.id).subscribe(res => {
        this.dialogService.hideBlocker();
          this.dialogService.showNotification('Акт сохранен');
        this.router.navigate(['main/document/application/' + res.id + '/view']);
      });

    });
  } else {
    this.dialogService.showMessageDlg('Ошибка валидации', this.validationError);
  }
  }
}
