import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/AuthenticationService';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate  {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = this.authenticationService.currentUserValue;
       // console.log("permission >>>> ...." + this.authenticationService.permission);
        //console.log("current url >>>> ...." + state.url);
        //console.log("permission check>>>> ...."+ this.authenticationService.permission.indexOf(state.url));
        console.log("currentUser check>>>>"+currentUser);
        var param = '';
        param = route.paramMap.get('userId');
        //console.log("check param >>>>"+param);
        if (currentUser) {
             if (this.authenticationService.permission.indexOf(state.url) == -1) {
                    if(param === ''){
                        this.router.navigate(['/access-denied']);
                        return false;
                    }
                    
             }
            // logged in so return true
            return true;
        }
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
        // not logged in so redirect to login page with the return url
    }
}