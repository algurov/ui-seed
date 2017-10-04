import { Component } from '@angular/core';
import { Partner } from '../../../models/partner';
import { PartnerService } from '../../../services/partner.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../../services/dialog.service';
import { MainService } from '../../../services/main.service';

@Component({
  templateUrl: './partner.list.component.html',
  styleUrls: ['./partner.list.component.scss']
})
export class PartnerListComponent {
  displayedColumns = [{column: 'name', title:'PARTNER_NAME'}, {column: 'partnerType', title: 'PARTNER_TYPE'}, {column: 'documentNumber', title: 'PARTNER_DOC_NUMBER'}];
  allPartners: Array<Partner> = new Array<Partner>();
  dataSource : PartnerDataSource;
  partnerDb: PartnerDataBase;
  constructor(private partnerService : PartnerService, public dlgService: DialogService,
      public mainService: MainService) {
    this.partnerDb = new PartnerDataBase(partnerService, dlgService);
    this.dataSource = new PartnerDataSource(this.partnerDb);
    mainService.partnerAdded.subscribe(item => this.addPartner(item));
    mainService.partnerUpdated.subscribe(item => this.updatePartner(item));
    mainService.partnerDeleted.subscribe(item => this.removePartner(item));
  }

  addPartner(item) {
    this.partnerDb.addPartner(item);
    this.dlgService.showNotification('Контрагент добавлен');
  }

  updatePartner(item) {
    this.partnerDb.updatePartner(item);
    this.dlgService.showNotification('Контрагент обновлен');
  }

  removePartner(item) {
    this.partnerDb.removePartner(item);
    this.dlgService.showNotification('Контрагент удален');
  }


  deletePartner(item) {
    this.dlgService.showConfirm('Удаление контрагента', 'Вы уверены, что хотите удалить контрагента?')
    .subscribe(res => {if (res) {
      this.partnerService.deletePartner(item).subscribe(r => {
        this.mainService.partnerDeleted.emit(item);
      });}
    });
  }
  ngOnInit() {

  }

  editPartner(partner) {
    this.dlgService.showEditAgentDialog(partner);
    console.log(partner);
  }
}

export class PartnerDataBase {
  dataChange: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>([]);
  get data(): Partner[] { return this.dataChange.value; }

  constructor(partnerService, dlgService : DialogService) {
    dlgService.block = true;
    partnerService.getPartnerList(1,10).subscribe(res => {
      res.forEach(item => {
        this.addPartner(item);
      });
      dlgService.block = false;
    });
  }

  addPartner(item) {
    const copiedData = this.data.slice();
    copiedData.push(new Partner().deserialize(item));
    this.dataChange.next(copiedData);
  }

  updatePartner(item) {
    const copiedData = this.data.slice();
    copiedData.find(one => one.id == item.id).deserialize(item);
    this.dataChange.next(copiedData);
  }

  removePartner(item) {
    const copiedData = this.data.slice();
    let it = copiedData.find(one => one.id == item.id);
    let index = copiedData.indexOf(it);
    copiedData.splice(index, 1);
    this.dataChange.next(copiedData);
  }
}

export class PartnerDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  partnerService : any;
  data: Array<Partner> = new Array<Partner>();
  constructor(public partnerDb: PartnerDataBase) {
    super();
  }

  connect(): Observable<Partner[]> {
    //return this.data;
    //return Observable.of(this.data);
    return this.partnerDb.dataChange;
    // const displayDataChanges = [
    //   this.partnerDb.dataChange
    //
    // ];
    // return Observable.merge(...displayDataChanges).map(() => {
    //   return this.partnerDb.data.slice()});
  }

  disconnect() {}
}
