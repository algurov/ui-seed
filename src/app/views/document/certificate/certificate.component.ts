import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  id: number;
  data: any = {
  };
  subscriptions = [];
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        if (action == 'SAVE_CERTIFICATE') {
          this.save();
        }
        if (action == 'SIGN_CERTIFICATE') {
          this.dialogService.showSignDialog(this.id, 'CERTIFICATE');
        }
      }));
      // this.dialogService.showBlocker();
      // this.route.params.subscribe(params => {
      //   if (params['id']) {
      //       this.dialogService.block = true;
      //     this.id = +params['id'];
      //    this.documentService.getCertificateById(this.id).subscribe(res=> {
      //      this.data = res;
      //      this.mainService.actLoaded.emit(this.data);
      //      this.dialogService.block = false;
      //    });
      //  }
      // });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name:'CERTIFICATE_EDIT', state: this.id? true: false});
  }

  beforeSave() {
    // if (this.data.agents) {
    //   if (this.data.agents.length > 0) {
    //     this.data.agents.forEach(item => {
    //       delete item.guid;
    //     });
    //   }
    // }
  }
  save() {
    // this.beforeSave();
    // this.dialogService.showBlocker();
    // console.log(this.data);
    // this.documentService.updateAct(this.data).subscribe(res => {
    //   this.data = res;
    //   this.documentService.getApplicationByActId(this.data.id).subscribe(res => {
    //     this.dialogService.hideBlocker();
    //       this.dialogService.showNotification('Акт сохранен');
    //     this.router.navigate(['main/document/application/' + res.id + '/view']);
    //   });
    //
    // });

  }
}
