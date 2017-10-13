import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { DialogService } from './services/dialog.service';
import { MainService } from './services/main.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [MatIconRegistry]
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public iconReg: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public dlgService : DialogService,
    public mainService: MainService,
    public SettingsService: SettingsService
  ) {
    iconReg.addSvgIcon('agent', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_agent.svg'))
    .addSvgIcon('docs', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_docs.svg'))
    .addSvgIcon('files', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_files.svg'))
    .addSvgIcon('location', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_location.svg'))
    .addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_logo.svg'))
    .addSvgIcon('logout', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_logout.svg'))
    .addSvgIcon('photo', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_photo.svg'))
    .addSvgIcon('role', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_role.svg'))
    .addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_settings.svg'))
    .addSvgIcon('task', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_task.svg'))
    .addSvgIcon('taxonomy', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_taxonomy.svg'))
    .addSvgIcon('user', sanitizer.bypassSecurityTrustResourceUrl('../assets/icon/icon_user.svg'));
   }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
