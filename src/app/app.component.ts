import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
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
    public oauthService : OAuthService
  ) {
    this.oauthService.loginUrl = 'http://82.202.236.172:9999/auth-server/oauth/authorize?response_type=code&client_id=client_seed&state=сlient_id%3Dclient_seed%26goto%3Dhttp%3A%2F%2F82%2E202%2E236%2E172%3A3000%2Fmain%26gotoOnFail%3Dhttp%3A%2F%2F82%2E202%2E236%2E172%3A3000%2Flogin&redirect_uri=http://82.202.236.172:9998/oauth2-consumer/authorize';
    console.log('trying');
    this.oauthService.initImplicitFlow();
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
