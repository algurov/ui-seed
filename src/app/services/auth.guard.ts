import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //   let token = String(this.localStorage.get('token'));
    //   if (token != null) {
    //     return this.services.keepAlive(token)
    //         .map(response => {
    //             if (response.status == 'OK') {
    //                 console.log("response OK");
    //                 return true;
    //             } else {
    //                 console.log("response KO");
    //                 this.router.navigate(['login']);
    //                 return false;
    //             }
    //         });
    //       } else {
    //     this.router.navigate(['login']);
    //     return false;
    //   }
    // }
}
