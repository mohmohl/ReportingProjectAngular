import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
@Injectable({
    providedIn: 'root'
  })
export class CommomBranchService{
    constructor(private http: HttpClient,private authService : AuthenticationService) { 
    }

    public get_access_branch(): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/common_branch/get_access_branch_list_by_user_fe');
    }

    public get_home_branch(): Observable<any>{
        var userId=this.authService.currentUserValue.userId;
        return this.http.get<any>(`${environment.baseUrl}`+'/common_branch/get_home_branch_by_user_fe');
      }
}