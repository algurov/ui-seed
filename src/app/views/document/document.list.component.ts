import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../services/dialog.service';
import { StringService } from '../../services/string.service';


@Component({
  selector: 'document-list',
  templateUrl: './document.list.component.html',
  styleUrls: ['./document.list.component.scss']
})
export class DocumentListComponent {
  displayedColumns = [{column: 'type', title:'DOCUMENT_TYPE', type:'const'}, {column: 'number', title:'DOCUMENT_NUMBER'}, {column: 'creationDate', title: 'DOCUMENT_DATE', type:'date'}, {column: 'applicant', property:'name', title: 'DOCUMENT_APPLICANT'}];
  subscription: Array<any> = new Array<any>();
  dataSource : DocumentDataSource;
  documentDb: DocumentDataBase;
  applicationList : Array<any> = new Array<any>();

  constructor(public mainService: MainService, public router: Router, private documentService: DocumentService,
    private dlgService: DialogService) {
    this.subscription.push(this.mainService.menuActionPerformed.subscribe(item => {
      if (item == 'ADD_APPLICATION') {
        this.newOrder();
      }
      if (item == 'ADD_ACT') {
        this.newAct();
      }
    }));
    this.subscription.push(this.mainService.applicationRemoved.subscribe(item => {
      this.documentDb.removeApplication(item);
    }));
    this.documentDb = new DocumentDataBase(router, documentService, dlgService);
    this.dataSource = new DocumentDataSource(this.documentDb);
  }

  editApplication(application) {
    this.router.navigate(['main/document/application/' + application.id]);
  }

  viewApplication(application) {
      this.router.navigate(['main/document/application/' + application.id +'/view']);
  }

  removeApplication(application) {
    this.dlgService.showConfirm('Удаление заявки', 'Подтвердите удаление заявки').subscribe(res => {
      if (res) {
        this.dlgService.showBlocker();
        this.documentService.deleteApplication(application).subscribe(res => {
            this.mainService.applicationRemoved.emit(application);
            this.dlgService.hideBlocker();
            this.dlgService.showNotification('Заявка удалена');
        });
      }
    })

  }
  ngOnInit() {
    this.mainService.menuChange.emit({name: 'APPLICATION'});
  }
  ngOnDestroy() {
    this.subscription.forEach(item => {
      item.unsubscribe();
    });
  }
  newOrder() {
    this.router.navigate(['main/document/application']);
  }

  newAct() {
    this.router.navigate(['main/document/act']);
  }

  openApplication(id) {
    this.router.navigate(['main/document/application/' + id]);
  }

}

export class DocumentDataBase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(public router, public documentService, public dlgService : DialogService) {
    dlgService.block = true;
    documentService.getApplicationList().subscribe(res => {
      res.content.forEach(item => {
        this.addApplication(item);
      });
      dlgService.block = false;
    });
    // this.addApplication({type: 'Заявка', id: 1, number:'Номер 1', applicant: {name: 'ООО "Зерно"'}, created:'10/10/2012'});
    // this.addApplication({type: 'Заявка', id: 2, number:'Номер 2', applicant: {name: 'ООО "Бубочка"'}, created:'10/10/2012'});
    // this.addApplication({type: 'Заявка', id: 3, number:'Номер 3', applicant: {name: 'ООО "Санфлавер"'}, created:'10/10/2012'});
    // this.addApplication({type: 'Заявка', id: 4, number:'Номер 4', applicant: {name: 'ЗАО "Крупица"'}, created:'10/10/2012'});
  }

  changeSearch(params) {
    this.dataChange.next([]);
    this.dlgService.block = true;
    this.documentService.searchPartnersByParams(params).subscribe(res => {
      res.content.forEach(item => {
        this.addApplication(item);
      });
      this.dlgService.block = false;
    });
  }

  addApplication(item) {
    const copiedData = this.data.slice();
    copiedData.push(item);
    this.dataChange.next(copiedData);
  }

  removeApplication(item) {
    const copiedData = this.data.slice();
    let it = copiedData.find(one => one.id == item.id);
    let index = copiedData.indexOf(it);
    copiedData.splice(index, 1);
    this.dataChange.next(copiedData);
  }
}

export class DocumentDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  partnerService : any;
  data: Array<any> = new Array<any>();
  constructor(public documentDb: DocumentDataBase) {
    super();
  }
  getDataCount() {
    return this.documentDb.data.length;
  }
  connect(): Observable<any[]> {
    //return this.data;
    //return Observable.of(this.data);
    return this.documentDb.dataChange;
    // const displayDataChanges = [
    //   this.partnerDb.dataChange
    //
    // ];
    // return Observable.merge(...displayDataChanges).map(() => {
    //   return this.partnerDb.data.slice()});
  }

  disconnect() {}
}
