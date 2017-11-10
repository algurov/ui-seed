import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  id: number;
  data: any = {
    status: 'CREATED',
    isFreeCertificationRequired: false,
    isQuickCertificationRequired: false,
    isSampleSelectionRequired: true,  // true by default
    isAnalysisCardRequired: true
  };
  constructor(private mainService: MainService, private settingsService: SettingsService,
    private partnerService: PartnerService, private dialogService: DialogService,
    private documentService: DocumentService, private route: ActivatedRoute,
    private router: Router) {
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.documentService.getApplicationById(this.id).subscribe(res=> {
           this.data = res;
           if (this.data.manufacturers) {
             if (this.data.manufacturers.length > 0) {
             let index = 0;
             this.data.manufacturers.forEach(item => {
               item.guid = index;
               index++;
             });
           }
           }
           this.mainService.applicationLoaded.emit(this.data);
           this.dialogService.block = false;
           console.log('read');
           console.log(this.data);
           //console.log(JSON.stringify(this.data));
         });
       } else {
         //this.dialogService.block = false;
       }
      });
    }

  ngOnInit() {

    // if (localStorage.getItem('application')) {
    // this.data = JSON.parse(localStorage.getItem('application'));
    // console.log(this.data);
    // }

    if (!this.data.id){
    if (this.settingsService.settings.selectedPartnerId) {
      this.dialogService.showBlocker();
      this.partnerService.getPartnerById(this.settingsService.settings.selectedPartnerId)
        .subscribe(res => {this.data.applicant = res; this.dialogService.block = false;
        if (!this.data.id){
          this.data.documentsReceiver = res;
          this.data.cargoOwner = res;
         }
         this.dialogService.hideBlocker();
      });
    } else {
    //  this.dialogService.block = false;
    }}
  }

  removeUuid(applicationResearch) {
    delete applicationResearch.uuid;
    if (applicationResearch.children.length > 0) {
      applicationResearch.children.forEach(item => {
        this.removeUuid(item);
      });
    }
  }

  clearData() {
    if (this.data.manufacturers) {
      this.data.manufacturers.forEach(item => delete item.guid);
    }
    if (this.data.applicationStandardResearches) {
      this.data.applicationStandardResearches.forEach(item => {
        item.applicationResearches.forEach(it => {
          this.removeUuid(it);
        });

      });
    }
  }

  save() {
      //this.data.id = 1;
      this.clearData();
      console.log('write');
      console.log(this.data);
      console.log(JSON.stringify(this.data));
      this.dialogService.showBlocker();
      if(!this.data.id) {
        this.documentService.createApplication(this.data).subscribe(res => {
          console.log(res);
          this.dialogService.hideBlocker();
          this.router.navigate(['main/document']);
          this.dialogService.showNotification('Заявка ' + res.number + ' сохранена');
        });
      } else {
        this.documentService.updateApplication(this.data).subscribe(res => {
          console.log(res);
          console.log(JSON.stringify(res));
          this.dialogService.hideBlocker();
          this.router.navigate(['main/document']);
          this.dialogService.showNotification('Заявка ' + res.number + ' сохранена')});
      }


    //localStorage.setItem('application', JSON.stringify(this.data));
  }
}
