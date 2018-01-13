import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { StringService } from '../../../services/string.service';
import { DocumentService } from '../../../services/document.service';
import { DialogService } from '../../../services/dialog.service';
import { applyOperation, compare, observe, generate } from 'fast-json-patch';
import { BranchOfficeService } from '../../../services/branch.service';
import { SettingsService } from '../../../services/settings.service';
import { MatDialog } from '@angular/material';
import { ServiceDialog } from './service.dialog/service.dialog';
import { CoeffDialog } from './coeff.dialog/coeff.dialog';
import { MainService } from '../../../services/main.service';
import { DataService } from '../../../services/data.service';
import { CalculationService } from '../../../services/calculation.service';
import { PartnerService } from '../../../services/partner.service';
@Component({
  selector: 'calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent {
  id: number;
  observer: any;
  applicationId: any;
  application: any;
  applicant: any;
  applicantBankDetails: any;
  applicantBankDetailsId: any;
  applicantAccount: any;
  applicantAccountId: any;
  branchOffice: any;
  branchAccount: any;
  branchBankDetails: any;
  date: any;
  data: any = {
  };
  coeffList: Array<any> = new Array<any>();
  coeffValue: Array<any> = new Array<any>();
  servicesList: Array<any> = new Array<any>();
  subscribes: Array<any> = new Array<any>();
  defaultPaymentDescription = 'п.1 за определение показателей качества и безопасности зерна и продуктов его переработки при экспортных и импортных операциях и перемещении внутри страны';
  constructor(private stringService: StringService, private route: ActivatedRoute,
    private documentService: DocumentService, private dialogService: DialogService,
    private branchOfficeService: BranchOfficeService, private settingsService: SettingsService,
    private dialog: MatDialog, private mainService: MainService, private dataService: DataService,
    private calculationService: CalculationService, private partnerService: PartnerService) {
    this.subscribes.push(this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'SAVE_CALCULATION') {
        this.save();
      }
      if (action == 'SIGN_CALCULATION') {
        this.dialogService.showSignDialog(this.id, 'CALCULATION');
      }
    }));
    this.route
      .queryParams
      .subscribe(params => {
        this.applicationId = +params['applicationId'] || 0;
        if (this.applicationId) {
          this.dialogService.showBlocker();
          this.documentService.getApplicationById(this.applicationId).subscribe(application => {
            this.application = application;
            this.partnerService.getPartnerById(this.application.applicant.id).subscribe(partner => {
              this.applicant = partner;
            });
            // this.applicant = this.application.applicant;
            this.branchOffice = this.application.branchOffice;
            this.branchBankDetails = this.branchOffice.bankAccountDetails[0];
            this.branchAccount = this.branchBankDetails.personalAccounts[0];
            this.data.paymentReceiver = this.branchOffice;
            this.data.paymentReceiverAccount = this.branchBankDetails;
            this.data.paymentSender = this.application.applicant;
            this.data.paymentPurpose = this.defaultPaymentDescription;
            console.log(this.application);
            this.dialogService.hideBlocker();
          });
        }
      });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.dialogService.showBlocker();
        this.calculationService.getCalculationById(this.id).subscribe(calculation => {
          this.data = calculation;
          console.log(this.data);
          this.observer = observe(this.data);
          this.initModel();
          this.dialogService.hideBlocker();
        });
      }
    });
  }

  initModel() {
    this.application = this.data.application;
    this.applicant = this.data.paymentSender
    this.branchOffice = this.data.paymentReceiver;
    this.branchBankDetails = this.data.paymentReceiverDetails;
    this.branchAccount = this.branchBankDetails.personalAccounts[0];
    this.applicantBankDetails = this.data.paymentSenderDetails;
    this.applicantAccount = this.data.paymentSenderAccount;
    this.defaultPaymentDescription = this.data.paymentPurpose;
    this.applicantAccountId = this.applicantAccount.id;
    this.applicantBankDetailsId = this.applicantBankDetails.id;
    this.servicesList = this.data.orderItems;
    this.coeffList = this.data.priceCoefficients;
  }

  onBranchAccountChange(event) {
    this.branchAccount = event.value;
    this.data.paymentReceiverAccount = this.branchAccount;
  }

  onBranchBankDetailsChange(event) {
    this.branchBankDetails = event.value;
    this.data.paymentReceiverDetails = this.branchBankDetails;
  }

  onApplicantAccountChange(event) {
    this.applicantAccountId = event.value;
    this.applicantAccount = this.applicantBankDetails.personalAccounts.find(it => it.id == this.applicantAccountId);
    this.data.paymentSenderAccount = this.applicantAccount;
  }

  onApplicantBankDetailsChange(event) {
    this.applicantBankDetailsId = event.value;
    this.applicantBankDetails = this.applicant.bankAccountDetails.find(it => it.id == this.applicantBankDetailsId);
    this.data.paymentSenderDetails = this.applicantBankDetails;
  }

  onServiceDataRemoved(event) {
    let index = this.servicesList.findIndex(item => item.pricelistItem.id == event.pricelistItem.id);
    if (index >= 0) {
      this.servicesList.splice(index, 1);
    }
    this.recalculate();
  }

  onCoeffDataRemoved(event) {
    let index = this.coeffList.findIndex(item => item.id == event.id);
    if (index >= 0) {
      this.coeffList.splice(index, 1);
    }
    //this.recalculate();
  }

  onServiceDataChange(event) {
    this.recalculate();

  }

  recalculate() {
    let subTotal = 0;
    this.servicesList.forEach(item => {
      subTotal += item.orderPrice;
    });
    this.data.subTotalPrice = subTotal;
    this.data.vatSum = subTotal * 0.12;
    this.data.totalPrice = this.data.subTotalPrice + this.data.vatSum;
  }

  selectCoeff() {
    let dialogRef = this.dialog.open(CoeffDialog);
    dialogRef.componentInstance.propertySelected.subscribe(item => {
      if (!this.coeffList.find(it => it.id == item.id)) {
        this.coeffList.push(item);
        this.coeffValue.push(item.coefficient);
        this.dialogService.showNotification(item.coefName + ' добавлен');
        //this.recalculate();
      }

    });
  }
  selectService() {
    let dialogRef = this.dialog.open(ServiceDialog, { data: { branchOffice: this.branchOffice } });
    dialogRef.componentInstance.propertySelected.subscribe(item => {
      if (!this.servicesList.find(it => it.id == item.id)) {
        let orderItem = {
          id: null,
          version: null,
          pricelistItem: item,
          amount: 1,
          price: item.amount,
          coefficient: 1,
          orderPrice: item.amount
        };
        this.servicesList.push(orderItem);
        this.recalculate();
        this.dialogService.showNotification(item.name + ' добавлен');
      }

    });
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);;
    this.data.creationDate = this.date.getTime();
  }

  ngOnInit() {
    if (this.data.creationDate) {
      this.date = new Date(this.data.creationDate);
    } else {
      this.date = new Date();
      this.data.creationDate = this.date.getTime();
    }
    this.mainService.menuChange.emit({ name: 'CALCULATION_EDIT', state: this.id ? true : false });

  }

  beforeSave() {
    if (this.id) {
    } else {
      this.data.paymentReceiver = {id: this.branchOffice.id, version: this.branchOffice.version };
      this.data.paymentReceiverDetails = {id: this.branchBankDetails.id, version: this.branchBankDetails.version};
      this.data.paymentReceiverAccount = {id: this.branchAccount.id, version: this.branchAccount.version};
      this.data.paymentSender = {id: this.applicant.id, version: this.applicant.version};
      this.data.paymentSenderDetails = {id: this.applicantBankDetails.id, version: this.applicantBankDetails.version};
      this.data.paymentSenderAccount = {id: this.applicantAccount.id, version: this.applicantAccount.id};
      this.servicesList.forEach(item => {
        delete item.uuid;
        delete item.pricelistItem.uuid;
        let obj = {id: item.pricelistItem.id, version: item.pricelistItem.version};
        item.pricelistItem = obj;
      });
      this.data.priceCoefficients = this.coeffList;
      this.data.orderItems = this.servicesList;
      this.data.id = null;
      this.data.version = null;
    }
  }
  save() {
    this.beforeSave();
    if (this.id) {
      let patch = generate(this.observer);
      console.log(patch);
      this.calculationService.updateCalculation(patch, this.id).subscribe(res => {
        this.dialogService.showNotification('updated');
      });
    } else {
      console.log(this.data);
      console.log(JSON.stringify(this.data));
      this.calculationService.createCalculation(this.data).subscribe(res => {
        this.dialogService.showNotification('saved');
        console.log(res);
      });
    }
  }

}
