
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { MainService } from '../../services/main.service';
import { MdSidenav } from '@angular/material';
import { views } from '../../app-nav-views';

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.scss'],
  templateUrl: './panel.component.html'
})

export class PanelComponent {

sidenavShown: boolean = true;
navViews: any;
constructor(public dlgService: DialogService, public main : MainService){
  this.navViews = views;
}
toggleSideNav() {
  this.sidenavShown = !this.sidenavShown;
    this.main.toggleSidenav.next(this.sidenavShown);
  //this.side.nativeElement.toggle();
}
showDlg() {
      this.dlgService.showMessageDlg('My title', 'My message');
}

}
