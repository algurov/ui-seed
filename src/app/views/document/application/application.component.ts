import { Component } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { ApplicationService } from '../../../services/application.service';
import { ActivatedRoute } from '@angular/router';

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
    private applicationService: ApplicationService, private route: ActivatedRoute) {
      this.dialogService.showBlocker();
      this.route.params.subscribe(params => {
        if (params['id']) {
            this.dialogService.block = true;
          this.id = +params['id'];
         this.applicationService.getApplicationById(this.id).subscribe(res=> {
           this.data = res;
           this.mainService.applicationLoaded.emit(this.data);
           this.dialogService.block = false;
           console.log(this.data);
           console.log(JSON.stringify(this.data));
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
          this.data.owner = res;
         }
         this.dialogService.hideBlocker();
      });
    } else {
    //  this.dialogService.block = false;
    }}
  }

  save() {
      //this.data.id = 1;
      console.log(this.data);
      console.log(JSON.stringify(this.data));
      // this.dialogService.showBlocker();
      // if(!this.data.id) {
      //   this.applicationService.createApplication(this.data).subscribe(res => {
      //     console.log(res);
      //     this.dialogService.hideBlocker();
      //     this.dialogService.showNotification('Заявка ' + res.number + ' сохранена');
      //   });
      // } else {
      //   this.applicationService.updateApplication(this.data).subscribe(res => {
      //     this.dialogService.hideBlocker();
      //     this.dialogService.showNotification('Заявка ' + res.number + ' сохранена')});
      // }


    //localStorage.setItem('application', JSON.stringify(this.data));
  }
}
