
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user';
import { StringService } from '../../services/string.service';
import { UserService } from '../../services/user.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { PartnerService } from '../../services/partner.service';
import { MainService } from '../../services/main.service';
import { DataService } from '../../services/data.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html'
})
export class TableComponent {
  cols = [];
  constructor(private stringService: StringService, private router: Router, private dlgService: DialogService,
      private partnerService: PartnerService, private mainService: MainService, private route: ActivatedRoute,
      private dataService: DataService, private applicationService: ApplicationService){

  }
  @Input() displayedColumns;
  @Input() dataSource;
  @Input() edit;
  @Input() remove;

   editRow(row){
     this.edit(row);
   }

   deleteRow(row) {
     this.remove(row);
   }

   ngOnInit() {
     this.displayedColumns.forEach(item => {
       this.cols.push(item.column);
     });
     this.cols.push('actions');
   }

   getColumnValue(element, column) {
     if (column.property) {
       return element[column.column][column.property];
     }
     if (column.data) {
       return this.dataService.getDataFromList(column.data, element[column.column]);
     }
     if (column.type) {
       if (column.type == 'date') {
         let d = new Date(element[column.column]);
         return d.getDay() + '.' + d.getMonth() + '.' + d.getFullYear();
       }
     }
     if (column.type == 'const') {
       return 'Заявка';
     }
     return element[column.column];
   }
}
