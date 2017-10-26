import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyService } from '../../../services/taxonomy.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'taxonomy-item',
  templateUrl: './taxonomy.item.component.html',
  styleUrls: ['./taxonomy.item.component.scss']
})
export class TaxonomyItemComponent {
  displayedColumns = [];
  taxonomy: string;
  fullTaxonomy: any;
  dataSource : TaxonomyDataSource;
  taxonomyDb: TaxonomyDataBase;
  constructor(public taxonomyService: TaxonomyService, private route: ActivatedRoute,
    public dlgService: DialogService) {

    this.route.params.subscribe(params => {
        if (params['tax']) {
          this.taxonomy = params['tax'];
          this.fullTaxonomy = this.taxonomyService.getTaxonomy(this.taxonomy);
          console.log(this.fullTaxonomy);
           this.fullTaxonomy.columns.forEach(item => {
             if(item.name == 'name' || item.name == 'fullName' || item.name == 'fullNameRu' || item.name == 'titleRu' || item.name == 'nameRu') {
               this.displayedColumns.push({column: item.name, title: 'NAME'});
             }
           });
          this.taxonomyDb = new TaxonomyDataBase(this.taxonomy, this.taxonomyService, this.dlgService);
          this.dataSource = new TaxonomyDataSource(this.taxonomyDb);
      }
  });
  }

  editTaxonomy(taxonomy) {
    this.route.params.subscribe(params => {
        if (params['tax']) {
          this.taxonomy = params['tax'];
          this.dlgService.showEditTaxonomyDialog(taxonomy, this.taxonomy);
      }
  });

  }

}

export class TaxonomyDataBase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor(taxonomy:string, public taxonomyService, public dlgService : DialogService) {
    dlgService.block = true;
    taxonomyService.loadTaxonomyData(taxonomy).subscribe(res => {
      res.content.forEach(item => {
        this.addItem(item);
      });
      dlgService.block = false;
    });
  }

  // changeSearch(params) {
  //   this.dataChange.next([]);
  //   this.dlgService.block = true;
  //   this.partnerService.searchPartnersByParams(params).subscribe(res => {
  //     res.content.forEach(item => {
  //       this.addPartner(item);
  //     });
  //     this.dlgService.block = false;
  //   });
  // }

  addItem(item) {
    const copiedData = this.data.slice();
    copiedData.push(item);
    this.dataChange.next(copiedData);
  }

  // updatePartner(item) {
  //   const copiedData = this.data.slice();
  //   copiedData.find(one => one.id == item.id).deserialize(item);
  //   this.dataChange.next(copiedData);
  // }

  // removePartner(item) {
  //   const copiedData = this.data.slice();
  //   let it = copiedData.find(one => one.id == item.id);
  //   let index = copiedData.indexOf(it);
  //   copiedData.splice(index, 1);
  //   this.dataChange.next(copiedData);
  // }
}

export class TaxonomyDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  partnerService : any;
  data: Array<any> = new Array<any>();
  constructor(public taxonomyDb: TaxonomyDataBase) {
    super();
  }
  getDataCount() {
    return this.taxonomyDb.data.length;
  }
  connect(): Observable<any[]> {
    //return this.data;
    //return Observable.of(this.data);
    return this.taxonomyDb.dataChange;
    // const displayDataChanges = [
    //   this.partnerDb.dataChange
    //
    // ];
    // return Observable.merge(...displayDataChanges).map(() => {
    //   return this.partnerDb.data.slice()});
  }

  disconnect() {}
}
