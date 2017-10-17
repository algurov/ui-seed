import { Component } from '@angular/core';
import { Partner } from '../../../models/partner';
import { PartnerService } from '../../../services/partner.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../../services/dialog.service';
import { MainService } from '../../../services/main.service';
import { StringService } from '../../../services/string.service';

@Component({
  templateUrl: './partner.list.component.html',
  styleUrls: ['./partner.list.component.scss']
})
export class PartnerListComponent {
  displayedColumns = [{column: 'name', title:'PARTNER_NAME'}, {column: 'partnerType', title: 'PARTNER_TYPE'}, {column: 'documentNumber', title: 'PARTNER_DOC_NUMBER'}];
  allPartners: Array<Partner> = new Array<Partner>();
  dataSource : PartnerDataSource;
  partnerDb: PartnerDataBase;
  filterParams: Array<any> = new Array<any>();
  constructor(private partnerService : PartnerService, public dlgService: DialogService,
      public mainService: MainService, public stringService: StringService) {
    this.partnerDb = new PartnerDataBase(partnerService, dlgService);
    this.dataSource = new PartnerDataSource(this.partnerDb);
    mainService.partnerAdded.subscribe(item => this.addPartner(item));
    mainService.partnerUpdated.subscribe(item => this.updatePartner(item));
    mainService.partnerDeleted.subscribe(item => this.removePartner(item));
    mainService.menuActionPerformed.subscribe(item => this.menuActionPerformed(item));
  }

  menuActionPerformed(item) {
    switch(item) {
      case 'PERSONAL_FILTER':
      let index = this.filterParams.findIndex(item => item.field == 'partnerType')
      if (index == -1) {
        this.filterParams.push({field:'partnerType', value: 'PERSON'});
      } else {
        this.filterParams[index] = {field:'partnerType', value: 'PERSON'};
      }
       break;
      case 'GROUP_FILTER':
      let _index = this.filterParams.findIndex(item => item.field == 'partnerType')
      if (_index == -1) {
        this.filterParams.push({field:'partnerType', value: 'ORGANIZATION'});
      } else {
        this.filterParams[_index] = {field:'partnerType', value: 'ORGANIZATION'};
      }
      break;
    }
    this.searchPartners(this.filterParams);
  }

  addNumberFilter(number) {
    let index = this.filterParams.findIndex(item => item.field == 'documentNumber')
    if (index == -1) {
      this.filterParams.push({field:'documentNumber', value: number});
    } else {
      this.filterParams[index] = {field:'documentNumber', value: number};
    }
    this.searchPartners(this.filterParams);
  }

  addNameFilter(name) {
    let index = this.filterParams.findIndex(item => item.field == 'name')
    if (index == -1) {
      this.filterParams.push({field:'name', value: name});
    } else {
      this.filterParams[index] = {field:'name', value: name};
    }
    this.searchPartners(this.filterParams);
  }

  searchPartners(params) {
    this.partnerDb.changeSearch(params);
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
    this.filterParams = [];
    //this.searchPartners(this.filterParams);
  }

  editPartner(partner) {
    this.partnerService.getPartnerById(partner.id).subscribe(res=>console.log(res));
    this.dlgService.showEditAgentDialog(partner);
    console.log(partner);
  }
}

export class PartnerDataBase {
  dataChange: BehaviorSubject<Partner[]> = new BehaviorSubject<Partner[]>([]);
  get data(): Partner[] { return this.dataChange.value; }

  constructor(public partnerService, public dlgService : DialogService) {
    dlgService.block = true;
    partnerService.getPartnerList().subscribe(res => {
      res.content.forEach(item => {
        this.addPartner(item);
      });
      dlgService.block = false;
    });
  }

  changeSearch(params) {
    this.dataChange.next([]);
    this.dlgService.block = true;
    this.partnerService.searchPartnersByParams(params).subscribe(res => {
      res.content.forEach(item => {
        this.addPartner(item);
      });
      this.dlgService.block = false;
    });
  }

  addPartner(item) {
    const copiedData = this.data.slice();
    copiedData.push(new Partner().deserialize(item));
    this.dataChange.next(copiedData);
  }

  updatePartner(item) {
    const copiedData = this.data.slice();
    let found = copiedData.find(one => one.id == item.id);
    if (found) {
      found.deserialize(item);
    } else {
        copiedData.push(new Partner().deserialize(item));
    }
  //  copiedData.find(one => one.id == item.id).deserialize(item);
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
