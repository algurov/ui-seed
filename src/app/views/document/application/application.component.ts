import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { SettingsService } from '../../../services/settings.service';
import { PartnerService } from '../../../services/partner.service';
import { DialogService } from '../../../services/dialog.service';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationTitleComponent } from './title/application.title.component';
import { ApplicationApplicantComponent } from './applicant/application.applicant.component';
import { ApplicationProductComponent } from './product/application.product.component';
import { ApplicationParamsComponent } from './params/application.params.component';
@Component({
  selector: 'application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  @ViewChild(ApplicationTitleComponent) title: ApplicationTitleComponent;
  @ViewChild(ApplicationApplicantComponent) applicant: ApplicationApplicantComponent;
  @ViewChild(ApplicationProductComponent) product: ApplicationProductComponent;
  @ViewChild(ApplicationParamsComponent) params: ApplicationParamsComponent;
  validationError = '';
  subscriptions = [];
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
      this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
        switch(action) {
          case 'SAVE_APPLICATION' : this.save(); break;
          case 'CANCEL_APPLICATION' : this.cancel(); break;
          case 'SIGN_APPLICATION': this.sign(); break;
        }
      }));

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
  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
  ngOnInit() {

    // if (localStorage.getItem('application')) {
    // this.data = JSON.parse(localStorage.getItem('application'));
    // console.log(this.data);
    // }
    this.mainService.menuChange.emit({name: 'APPLICATION_EDIT', state: this.id? true:false});
    if (!this.data.id){
    if (this.settingsService.settings.selectedPartnerId) {
    //  this.dialogService.showBlocker();
      this.partnerService.getPartnerById(this.settingsService.settings.selectedPartnerId)
        .subscribe(res => {this.data.applicant = res; this.dialogService.block = false;
        if (!this.data.id){
          this.data.documentsReceiver = res;
          this.data.cargoOwner = res;
         }
         //this.dialogService.hideBlocker();
      });
    } else {
      // this.dialogService.block = false;
    }}
  }

  removeUuid(applicationResearch) {
    delete applicationResearch.uuid;
    if (applicationResearch.goodsCategoryProperty) {
      console.log(1);
      delete applicationResearch.goodsCategoryProperty.uuid;
    }
    if (applicationResearch.property) {
      delete applicationResearch.property.uuid;
    }
    if (applicationResearch.children.length > 0) {
      applicationResearch.children.forEach(item => {
        this.removeUuid(item);
      });
    }
  }

  sign() {
      this.dialogService.showSignDialog(this.id, 'APPLICATION');
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

  cancel() {
    this.router.navigate(['main/document']);
  }

  checkValidation() {
    let error = true;
    this.validationError = '';
    if (!this.data.number) {
      this.validationError += 'Номер заявки должен быть заполнен. ';
      error = false;
    }
    if (!this.data.creationDate) {
      this.validationError += 'Дата должна быть заполнена. ';
      error = false;
    }
    if (!this.data.branchOffice) {
      this.validationError += 'Филиал должен быть заполнен. ';
      error = false;
    }
    if (!this.data.goodsWeight) {
      this.validationError += 'Масса должна быть заполнена. ';
      error = false;
    }
    if (!this.data.goods) {
      this.validationError += 'Продукт должен быть заполнен. ';
      error = false;
    }
    if (!this.data.applicantName) {
      this.validationError += 'Имя заявителя должено быть заполнено. ';
      error = false;
    }
    if (!this.data.applicationStandardResearches) {
      this.validationError += 'Стандарты должены быть заполнены. ';
      error = false;
    }
    if (!this.data.targetDocuments) {
      this.validationError += 'Целевые документы должены быть заполнены. ';
      error = false;
    }
    if (!this.data.researchType) {
      this.validationError += 'Тип исследования должен быть заполнен. ';
      error = false;
    }
    if (!this.data.applicant) {
      this.validationError += 'Заявитель должен быть заполнен. ';
      error = false;
    }
    return error;
  }

  save() {
      //this.data.id = 1;
      if (this.checkValidation()){
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

    } else {
      this.dialogService.showMessageDlg('Ошибка валидации', this.validationError);
    }
    //localStorage.setItem('application', JSON.stringify(this.data));
  }
}
