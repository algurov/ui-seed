import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'document-list',
  templateUrl: './document.list.component.html',
  styleUrls: ['./document.list.component.scss']
})
export class DocumentListComponent {
  constructor(public mainService: MainService, public router: Router) {
    this.mainService.menuActionPerformed.subscribe(item => {
      if (item == 'ADD_APPLICATION') {
        this.newOrder();
      }
    });
  }

  newOrder() {
    this.router.navigate(['main/document/application']);
  }
}
