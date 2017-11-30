
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
import { SettingsService } from '../../services/settings.service';
import { PartnerService } from '../../services/partner.service';
import { BranchOfficeService } from '../../services/branch.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.scss'],
  templateUrl: './panel.component.html'
})

export class PanelComponent {

topViews: Array<any> = new Array();
botViews: Array<any> = new Array();
selectedItem: any;
partner: any;
branchOffice: any;
menuActions: Array<any> = new Array<any>();
constructor(public dlgService: DialogService, public main : MainService, public stringService: StringService,
  public router : Router, public auth : AuthService, public route: ActivatedRoute, public settingsService: SettingsService,
  public partnerService: PartnerService, public branchOfficeService: BranchOfficeService, public dataService: DataService){
  menuItems.forEach(item => {
    if (item.top) {
      this.topViews.push(item);
    } else {
      this.botViews.push(item);
    }
  });
  this.selectedItem = this.findSelectedItem(this.router.url, menuItems);
  this.main.menuActionPerformed.subscribe(action => {
    if (action == 'logout'){
      this.logout();
    }
  });
  this.main.branchOfficeSelectedForUser.subscribe(res => this.refresh(true));
  this.main.partnerSelectedForUser.subscribe(res => this.refresh(true));
  this.main.menuChange.subscribe(res => this.updateMenuActions(res.name));

}

updateMenuActions(screen: string) {
  this.menuActions = this.dataService.getMenuActionsByScreen(screen);
}

refresh(reload) {
  //this.dlgService.showBlocker();
  if (this.settingsService.settings.selectedPartnerId) {
    this.partnerService.getPartnerById(this.settingsService.settings.selectedPartnerId).subscribe(res => {
      this.partner = res;
      //this.dlgService.hideBlocker();

    });
  }
  if (this.settingsService.settings.selectedBranchOfficeId) {
    this.branchOfficeService.getBranchOfficeById(this.settingsService.settings.selectedBranchOfficeId).subscribe(res => {
      this.branchOffice = res;
    //this.dlgService.hideBlocker();

    });
  }
}

findSelectedItem(url: string, items: Array<any>) {
  url = url.substring(1, url.length);
  let result = items[4];
  items.forEach(item => {

    if (url.startsWith(item.link)) {
      result = item;
    }
  });
  return result;
}

changeSelectedItem(item) {
  this.router.navigate([item.link]);
}
ngOnInit() {
  this.refresh(false);
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

// generateHtmlForMenu(title: string, items: Array<any>): string {
//     let subRes: string = "";
//     items.forEach(it => {
//       subRes+= `<div id="r" fxFlex (click)="changeRoute('/main/` + it.link + `')">
//         <i class="md-light material-icons">` + it.icon +`</i>
//         ` + this.stringService.get(it.name) +`
//       </div>`
//     });
//     let result = `<div fxLayout="column">
//     <div fxFlex="10%">`+ this.stringService.get(title) +`</div>
//     <div fxLayout="column" fxFlex="90%">
//       ` + subRes +`
//     </div>
//     </div>`;
//     console.log(result);
//     return result;
// }

performAction(item) {
  console.log('emit');
  this.main.menuActionPerformed.emit(item.action);
  // switch(item.action) {
  //   case 'logout': this.logout(); break;
  //   case 'add-agent': this.addAgent(); break;
  //   case 'PERSONAL_FILTER': this.main.menuActionPerformed.emit(item.action);break;
  //   case 'GROUP_FILTER': this.main.menuActionPerformed.emit(item.action); break;
  // }
}

logout() {
  this.auth.logout().subscribe(res => {
    Cookie.deleteAll();
    window.document.cookie = '';
    this.auth.login();
  });
}

getTitle() {
  if (this.settingsService.settings.selectedPartnerId) {
    if (this.partner) {
      return this.partner.name;
    }
  }
  if (this.settingsService.settings.selectedBranchOfficeId) {
    if (this.branchOffice) {
      return this.branchOffice.fullName;
    }
  }
}
}
