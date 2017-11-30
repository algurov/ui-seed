import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent {
  id: number;
  actId: number;
  act: any;
  application: any;
  data: any = {};
  subscriptions = [];
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
    this.mainService.menuChange.emit({name: 'PROTOCOL_EDIT'});
  }

  removeUid(arr) {
      arr.forEach(item => {
        delete item.uuid;
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

  save() {
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
    if (this.data.researchProtocolItems) {
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
  }
}
