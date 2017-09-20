
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
 ngAfterContentInit() {
    this.toggleSideNav(menuItems[0]);
 }

toggleSideNav(item) {
  // let data = {
  //   arr: items,
  //   html: this.generateHtmlForMenu(item)
  // };
  this.main.toggleSidenav.next(item);
}

generateHtmlForMenu(title: string, items: Array<any>): string {
    let subRes: string = "";
    items.forEach(it => {
      subRes+= `<div id="r" fxFlex (click)="changeRoute('/main/` + it.link + `')">
        <i class="md-light material-icons">` + it.icon +`</i>
        ` + this.stringService.get(it.name) +`
      </div>`
    });
    let result = `<div fxLayout="column">
    <div fxFlex="10%">`+ this.stringService.get(title) +`</div>
    <div fxLayout="column" fxFlex="90%">
      ` + subRes +`
    </div>
    </div>`;
    console.log(result);
    return result;
}

showDlg() {
      this.dlgService.showMessageDlg('My title', 'My message');
}

}
