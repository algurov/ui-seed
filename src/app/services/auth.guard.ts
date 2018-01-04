import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { AuthRefresh } from './auth.refresh';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // ensure user has auth and refresh tokens
        if (Cookie.get('at') && Cookie.get('reft')) {

            (new AuthRefresh(this.authService.http)).run();

            // try login user
            this.authService.tryLogin(Cookie.get('at'));


            // TODO: must be removed on prod environment
            if (Cookie.get('at') === 'dev') {
                return true;
            }

            return this.authService
                .me(Cookie.get('at'))
                .map(res => {
                    if (res) {
                        return true;
                    }
                })
                .catch(err => {
                    this.authService.login();
                    return Observable.of(false);
                });
        }
        else {
            this.authService.login();
            return Observable.of(false);
        }

    }
}
