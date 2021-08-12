import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private router: Router) { 

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            var error = '';
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log(">>>>> 401")
                console.log("error exception >> "+err.error.exception);
                error = err.error.exception;
                this.router.navigate(['/access-denied']);
                //this.authenticationService.logout();

            }
            if (err.status === 403) {
                console.log(">>>>> 403")
                error = err.error.message;
               // this.router.navigate(['/access-denied']);
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
        
            }
            if (err.status === 500) {
                console.log(">>>>> 500")
                error = err.error.message;
                // auto logout if 401 response returned from api
               // this.authenticationService.logout();
        
            }
            return throwError(error);
        }))
    }
}