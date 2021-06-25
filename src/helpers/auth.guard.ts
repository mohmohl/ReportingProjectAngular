import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/services/AuthenticationService';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = this.authenticationService.currentUserValue;
        console.log("permission >>>> ...." + this.authenticationService.permission);
        console.log("current url >>>> ...." + state.url);
        console.log("permission check>>>> ...."+ this.authenticationService.permission.indexOf(state.url));
        console.log("currentUser check>>>>"+currentUser);
        if (currentUser) {
            // if (this.authenticationService.permission.indexOf(state.url) == -1) {
            //     this.router.navigate(['/access-denied']);
            //     return false;
            // }
            // logged in so return true
            return true;
        }
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
        // not logged in so redirect to login page with the return url
    }
}