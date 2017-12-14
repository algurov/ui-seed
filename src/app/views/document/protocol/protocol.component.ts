import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtocolParamsComponent } from './params/protocol.params.component';
@Component({
  selector: 'protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent {
  id: number;
  @ViewChild(ProtocolParamsComponent) params: ProtocolParamsComponent;
  actId: number;
  act: any;
  application: any;
  data: any = {};
  subscriptions = [];
  validationError = '';
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        if (action == "SAVE_PROTOCOL") {
          this.save();
        }
        if (action == "CANCEL_PROTOCOL") {
          this.cancel();
        }
        if (action == 'SIGN_PROTOCOL') {
          this.dialogService.showSignDialog(this.id, 'TEST_REPORT');
        }
      }));
      this.dialogService.showBlocker();
      this.route
      .queryParams
      .subscribe(params => {
        this.actId= +params['actId'] || 0;
        if (this.actId) {
          this.documentService.getActById(this.actId).subscribe(act => {
            this.act = act;
          });
          this.documentService.getApplicationByActId(this.actId).subscribe(application => {
            this.application = application;
            this.dialogService.block = false;
          });
        }
      });
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.id = +params['id'];
         this.documentService.getProtocolById(this.id).subscribe(res=> {
           this.data = res;
           this.mainService.protocolLoaded.emit(this.data);

          // this.dialogService.hideBlocker();
         });
       }
      });
  }

  titleLoaded() {
    console.log('loaded!!');
    this.dialogService.hideBlocker();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name: 'PROTOCOL_EDIT', state: this.id? true: false});
  }

  removeUid(arr) {
      arr.forEach(item => {
        delete item.uuid;
        delete item.isExpanded;
        if (item.children) {
          this.removeUid(item.children);
        }
      });
  }

  beforeSave() {
    if (this.data.researchProtocolItems) {
      if (this.data.researchProtocolItems.length > 0) {
        this.removeUid(this.data.researchProtocolItems);
      }
    }
  }

  getApplicationId() {
      if (this.data.application) {
        return this.data.application.id;
      } else {
        return this.application.id;
      }
  }

  cancel() {
      this.router.navigate(['main/document/application/'+ this.getApplicationId() +'/view']);
  }

  checkValidation() {
    let valid = true;
    this.validationError = '';
    if (!this.data.protocolNumber) {
      this.validationError += 'Номер документа должен быть указан. ';
      valid = false;
    }
    if (!this.data.date) {
      this.validationError += 'Дата создания должна быть указана. ';
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
    if (this.id) {
    this.documentService.updateProtocol(this.data).subscribe(res => {
      this.data = res;
      console.log('response');
      console.log(this.data);
      this.documentService.getApplicationByActId(this.data.act.id).subscribe(r => {
        this.dialogService.hideBlocker();
        this.router.navigate(['main/document/application/' + r.id + '/view']);
        this.dialogService.showNotification('Протокол сохранен');
      });

    });
  } else {
    console.log(this.data);
    if (this.params.preview) {
    this.documentService.createProtocol(this.act.id, this.data).subscribe(res => {
      this.documentService.getApplicationByActId(this.act.id).subscribe(r => {
        this.dialogService.hideBlocker();
        this.router.navigate(['main/document/application/' + r.id + '/view']);
        this.dialogService.showNotification('Протокол сохранен');
      });
    });
  } else {
    this.dialogService.showMessageDlg('Ошибка', 'Сформируйте показатели');
    this.dialogService.hideBlocker();
  }
}
} else {
  this.dialogService.showMessageDlg('Ошибка валидации', this.validationError);
}
}
}
