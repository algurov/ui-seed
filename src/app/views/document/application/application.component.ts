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
      this.dialogService.block = true;
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.id = +params['id'];
         this.applicationService.getApplicationById(this.id).subscribe(res=> {
           this.data = res;
           this.readJson_2();
           this.mainService.applicationLoaded.emit(this.data);
           this.dialogService.block = false;
           console.log(this.data);
         });
       } else {
         this.dialogService.block = false;
       }
      });
    }

  ngOnInit() {

    if (localStorage.getItem('application')) {
    this.data = JSON.parse(localStorage.getItem('application'));
    this.readJson_2();
    console.log(this.data);
    }
    if (!this.data.id){
    if (this.settingsService.settings.selectedPartnerId) {
      this.partnerService.getPartnerById(this.settingsService.settings.selectedPartnerId)
        .subscribe(res => {this.data.applicant = res; this.dialogService.block = false;
        if (!this.data.id){
          this.data.documentsReceiver = res;
          this.data.owner = res;
         }
      });
    } else {
      this.dialogService.block = false;
    }}
  }

  selectPartner() {
    this.dialogService.showSelectTaxonomyDialog("Goods");
  }

  readJson() {
    if (this.data.customStandard) {
      let tmp = this.data.customStandard;
      delete this.data.customStandard;
      this.data.customStandard = {nodes: tmp.applicationResearches};
    }
    if (this.data.standards) {
      let tmpStandards = this.data.standards;
      delete this.data.standards;
      let res = [];
      tmpStandards.forEach(item => {
        item.standard.nodes = item.applicationResearches;
        res.push(item.standard);
      });
      this.data.standards = res;
    }

  }

  readJson_2() {
    // if (this.data.customStandard) {
    //   let tmp = this.data.customStandard;
    //   delete this.data.customStandard;
    //   this.data.customStandard = {nodes: tmp.applicationResearches};
    // }
    if (this.data.applicationStandardResearches) {
      let tmpStandards = this.data.applicationStandardResearches;
      delete this.data.applicationStandardResearches;
      let res = [];
      tmpStandards.forEach(item => {
        item.standard.nodes = item.applicationResearches;
        res.push(item.standard);
      });
      this.data.standards = res;
    }

  }

  prepareResult() {
      if (this.data.standards) {
        let standardsToSend = [];
        this.data.standards.forEach(item => {
          let appResearch = item.nodes;
          delete item.nodes;
          standardsToSend.push({standard: item, applicationResearches: appResearch});
        });
        this.data.standards = standardsToSend;
      }
      if (this.data.customStandard.nodes) {
        let appResearch = this.data.customStandard.nodes;
        delete this.data.customStandard.nodes;
          let standardsToSend = {name: 'Контракт', applicationResearches: appResearch};
        this.data.customStandard = standardsToSend;
        console.log(this.data.customStandard);
      } else {
        delete this.data.customStandard;
      }
      if (this.data.manufacturers) {
        this.data.manufacturers.forEach(item => {
          delete item.guid;
        });
      }
  }

  prepareResult_2() {
      if (this.data.standards) {
        let standardsToSend = [];
        this.data.standards.forEach(item => {
          let appResearch = item.nodes;
          // appResearch.forEach(it => {
          //   delete it.id;
          // });
          delete item.nodes;
          standardsToSend.push({standard: item, applicationResearches: appResearch});
        });
        this.data.applicationStandardResearches = standardsToSend;
      }
      if (this.data.customStandard  && this.data.customStandard.nodes) {
        let appResearch = this.data.customStandard.nodes;
        delete this.data.customStandard.nodes;
          let standardsToSend = {name: 'Контракт',customStandard: true, applicationResearches: appResearch};
        this.data.customStandard = standardsToSend;
        console.log(this.data.customStandard);
      } else {
        delete this.data.customStandard;
      }
      if (this.data.manufacturers) {
        this.data.manufacturers.forEach(item => {
          delete item.guid;
        });
      }
  }

  save() {
    this.prepareResult_2();
      //this.data.id = 1;
      console.log(this.data);
      console.log(JSON.stringify(this.data));
      if(!this.data.id) {
        this.applicationService.createApplication(this.data).subscribe(res => {
          console.log(res);
          this.dialogService.showNotification('Заявка ' + res.number + ' сохранена');
        });
      } else {
        this.applicationService.updateApplication(this.data).subscribe(res => {
          this.dialogService.showNotification('Заявка ' + res.number + ' сохранена')});
      }


    //localStorage.setItem('application', JSON.stringify(this.data));

    this.readJson_2();
  }
}
