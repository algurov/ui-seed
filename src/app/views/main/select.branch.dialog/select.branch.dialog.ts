import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StringService } from '../../../services/string.service';
import { PartnerService } from '../../../services/partner.service';
import { BranchOfficeService } from '../../../services/branch.service';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'select-branch-dlg',
  templateUrl: 'select.branch.dialog.html',
  styleUrls: ['/select.branch.dialog.scss']
})
export class SelectBranchDialog {
  dialog: MatDialogRef<SelectBranchDialog>;
  list: Array<any>;
  selectedItem: any;
  loaded = false;
  partnerList: Array<any>;
  branchList: Array<any>;
  partnerFilterParams = [];

  constructor(
    private stringService: StringService,
    private partnerService: PartnerService,
    private branchOfficeService: BranchOfficeService,
    private mainService: MainService,
    public dialogRef: MatDialogRef<SelectBranchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialog = dialogRef;
   }

   addPartnerFilterParam(param) {
     let found = this.partnerFilterParams.findIndex(item => item.field == param.field);
     if (found >= 0 ) {
       if (param.value == '') {
         this.partnerFilterParams.splice(found, 1);
       } else {
          this.partnerFilterParams[found].value = param.value;
       }
     } else {
       this.partnerFilterParams.push(param);
     }
   }
   addNameFilterPartner(name) {
     name = name.trim();
     let param = {field:'name', value: name};
     this.addPartnerFilterParam(param);
     this.loaded = false;
     this.partnerService.searchPartnersByParams(this.partnerFilterParams).subscribe(res => {
       this.partnerList = res.content;
       this.loaded = true;
     });
   }

   addNumberFilterPartner(number) {
     number = number.trim();
     let param = {field: 'documentNumber', value: number};
     this.addPartnerFilterParam(param);
     this.loaded = false;
     this.partnerService.searchPartnersByParams(this.partnerFilterParams).subscribe(res => {
       this.partnerList = res.content;
       this.loaded = true;
     });
   }

   addNameFilterBranch(name) {
     name = name.trim();
     let params = [{field:'fullName', value: name}];
     this.loaded = false;
     this.branchOfficeService.searchBeranchOfficeByParams(params).subscribe(res => {
       this.branchList = res.content;
       this.loaded = true;
     });
   }

   selectItem(item) {
     if (item) {
      this.selectItem = item;
      this.dialogRef.close(this.selectItem);
    } else {
      this.dialogRef.close();
    }
   }

   selectBranch(id) {
     this.mainService.branchOfficeSelectedForUser.emit(id);
     this.dialogRef.close();
   }

   selectPartner(id) {
     this.mainService.partnerSelectedForUser.emit(id);
     this.dialogRef.close();
   }

   ngOnInit() {
     this.partnerService.getPartnerList().subscribe(res => {
       this.partnerList = res.content;
       this.loaded = true;
     });
     this.branchOfficeService.getBranchOfficeList().subscribe(res => {
       this.branchList = res.content;
       this.loaded = true;
     });
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
