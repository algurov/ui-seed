import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Cookie.get('at') && Cookie.get('reft')) {
            this.authService.me(Cookie.get('at')).subscribe(res => {
              if (res.id) {
                return true;
              }
            });
        } else {
          this.authService.login();
          return false;
        }

    }
}
