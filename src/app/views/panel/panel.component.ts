
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { StringService } from '../../services/string.service';
import { MdSidenav } from '@angular/material';
import { menuItems } from './menu.items';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.scss'],
  templateUrl: './panel.component.html'
})

export class PanelComponent {


topViews: Array<any> = new Array();
botViews: Array<any> = new Array();
constructor(public dlgService: DialogService, public main : MainService, public stringService: StringService,
  public router : Router, public auth : AuthService){
  menuItems.forEach(item => {
    if (item.top) {
      this.topViews.push(item);
    } else {
      this.botViews.push(item);
    }
  });
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

performAction(item) {
  switch(item.action) {
    case 'logout': this.logout(); break;
  }
}

logout() {
  Cookie.deleteAll();
  window.document.cookie = '';
  this.router.navigateByUrl('/login');
  this.auth.logout();
}

}
