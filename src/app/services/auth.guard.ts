import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Cookie.get('at') && Cookie.get('reft')) {
            return true;
        }
        this.authService.login();
        //this.router.navigateByUrl('/login');
      //  window.location.href = this.authService.prepareAuthLink();
        //this.router.navigate(['/login']);
        return false;
    }
}
