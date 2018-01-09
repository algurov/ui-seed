import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
@Component({
  selector: 'calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent {
  id: number;
  applicationId: any;
  application: any;
  applicant: any;
  applicantBankDetails: any;
  applicantAccount: any;
  branchOffice: any;
  branchAccount: any;
  branchBankDetails: any;
  date: any;
  data : any = {
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
    private calculationService: CalculationService){
    this.subscribes.push(this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'SAVE_CALCULATION') {
        this.save();
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
          this.applicant = this.application.applicant;
          this.branchOffice = this.application.branchOffice;
          this.data.paymentReceiver = this.branchOffice;
          this.data.paymentSender = this.application.applicant;
          this.data.paymentPurpose = this.defaultPaymentDescription;
          console.log(this.application);
          this.dialogService.hideBlocker();
        });
      }
    });
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
    this.applicantAccount = event.value;
    this.data.paymentSenderAccount = this.applicantAccount;
  }

  onApplicantBankDetailsChange(event) {
    this.applicantBankDetails = event.value;
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
      this.data.vatSum = subTotal*0.12;
      this.data.totalPrice = this.data.subTotalPrice + this.data.vatSum;
  }

  selectCoeff() {
    let dialogRef = this.dialog.open(CoeffDialog);
    dialogRef.componentInstance.propertySelected.subscribe(item => {
        if (!this.coeffList.find(it => it.id == item.id)) {
            this.coeffList.push(item);
            this.coeffValue.push(item.coefficient);
            this.dialogService.showNotification(item.coefName + ' добавлен');
        }

    });
  }
  selectService() {
    let dialogRef = this.dialog.open(ServiceDialog, {data: {branchOffice: this.branchOffice}});
    dialogRef.componentInstance.propertySelected.subscribe(item => {
        if (!this.servicesList.find(it => it.id == item.id)) {
          let orderItem = {
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
    this.mainService.menuChange.emit({name:'CALCULATION_EDIT', state: this.id? true: false});
    // if (this.settingsService.settings.selectedBranchOfficeId) {
    //       this.branchOfficeService.getBranchOfficeById(this.settingsService.settings.selectedBranchOfficeId).subscribe(res => {
    //         this.branchOffice = res;
    //         this.data.paymentReceiver = this.branchOffice;
    //       });
    // }
  }

  beforeSave() {
    if (this.id) {
      //TODO patch here
    } else {
      this.data.orderItems = this.servicesList;
    }
  }
  save() {
    this.beforeSave();
    console.log(this.data);
    console.log(JSON.stringify(this.data));
    this.calculationService.createCalculation(this.data).subscribe(res => {
      this.dialogService.showNotification('saved');
    });

  }

}
