import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
@Injectable({
    providedIn: 'root'
  })
export class BackDateReportService{
   
    constructor(private http: HttpClient,private authService : AuthenticationService) { 
    }

    public getBranchList(): Observable<any>{
        var userId=this.authService.currentUserValue.userId;
        return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_branchList?userId='+userId);
      }
}