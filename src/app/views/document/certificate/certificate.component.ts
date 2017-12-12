import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateParamsComponent } from './params/certificate.params.component';

@Component({
  selector: 'certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  @ViewChild(CertificateParamsComponent) params: CertificateParamsComponent;
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
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getCertificateById(this.id).subscribe(res=> {
           this.data = res;
           console.log(this.data);
           this.mainService.certificateLoaded.emit(this.data);
           this.dialogService.block = false;
         });
       }
      });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {
    this.mainService.menuChange.emit({name:'CERTIFICATE_EDIT', state: this.id? true: false});
  }

  beforeSave() {
    if (this.params) {
      this.data.internationalCertificateTranslation.translationParams = this.params.translationParams;
    }
    this.data.advancedCertificateSettings.forEach(item => {
      let parent = item.parentGoodsCategoryProperty;
      while(parent != null) {
        delete parent.children;
        parent = parent.parentGoodsCategoryProperty;
      }
      delete item.children;
    });
  }
  save() {
    this.dialogService.showBlocker();
    this.beforeSave();
    this.data.internationalCertificateTranslation = JSON.stringify(this.data.internationalCertificateTranslation);
      console.log(this.data);
    this.documentService.updateCertificate(this.data).subscribe(res => {
      this.dialogService.hideBlocker();
      this.dialogService.showNotification('Сертификат сохранен');
      this.router.navigate(['main/document/application/'+ this.data.applicationId +'/view']);
    });
  }
}
