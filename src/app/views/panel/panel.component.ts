
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { MainService } from '../../services/main.service';
import { StringService } from '../../services/string.service';
import { MdSidenav } from '@angular/material';
import { menuItems } from './menu.items';

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.scss'],
  templateUrl: './panel.component.html'
})

export class PanelComponent {


navViews: any;
constructor(public dlgService: DialogService, public main : MainService, public stringService: StringService){
  this.navViews = menuItems;
}

toggleSideNav(title, items) {
  let data = {
    arr: items,
    html: this.generateHtmlForMenu(title, items)
  };
  this.main.toggleSidenav.next(data);
}

generateHtmlForMenu(title: string, items: Array<any>): string {
    let result = `<div fxLayout="column">
    <div fxFlex="10%">`+ this.stringService.get(title) +`</div>
    <div fxFlex="90%">
      <span *ngFor="let it of subItems" (click)="changeRoute(it.link)">
        <md-icon>{{it.icon}}</md-icon>
        {{stringService.get(it.name)}}
      </span>
    </div>
    </div>`;
    return result;
}

showDlg() {
      this.dlgService.showMessageDlg('My title', 'My message');
}

}
