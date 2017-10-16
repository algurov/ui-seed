
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { StringService } from '../../services/string.service';
import { MatSidenav } from '@angular/material';
import { menuItems } from './menu.items';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { API_BASE_URL } from '../../services/constants';

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.scss'],
  templateUrl: './panel.component.html'
})

export class PanelComponent {


topViews: Array<any> = new Array();
botViews: Array<any> = new Array();
selectedItem: any;
constructor(public dlgService: DialogService, public main : MainService, public stringService: StringService,
  public router : Router, public auth : AuthService){
  menuItems.forEach(item => {
    if (item.top) {
      this.topViews.push(item);
    } else {
      this.botViews.push(item);
    }
  });
  this.selectedItem = this.botViews[0];
}
changeSelectedItem(item) {
  this.router.navigate([item.link]);
}
 ngAfterContentInit() {
    //this.toggleSideNav(menuItems[0]);
 }

toggleSideNav(item) {
  // let data = {
  //   arr: items,
  //   html: this.generateHtmlForMenu(item)
  // };
  this.selectedItem = item;
  if (item.link) {
    this.router.navigate([item.link]);
  }
  //this.main.toggleSidenav.next(item);
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

performAction(item) {
  switch(item.action) {
    case 'logout': this.logout(); break;
    case 'add-agent': this.addAgent(); break;
    case 'PERSONAL_FILTER': this.main.menuActionPerformed.emit(item.action);break;
    case 'GROUP_FILTER': break;
  }
}

addAgent() {
  this.dlgService.showAddAgentDialog();
}

logout() {
  this.auth.logout().subscribe(res => {
    Cookie.deleteAll();
    window.document.cookie = '';
    this.auth.login();
  });
}

}
