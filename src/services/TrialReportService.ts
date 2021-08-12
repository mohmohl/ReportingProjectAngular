import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
@Injectable({
  providedIn: 'root'
})
export class TrialReportService {
   
    constructor(private http: HttpClient,private authService : AuthenticationService) { 
    }

    public getBranchList(): Observable<any>{
      var userId=this.authService.currentUserValue.userId;
      return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_branchList?userId='+userId);
    }

    public getCurrencyList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_currencyList');
    }


    public getTrialReportData(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{

       return this.http.post<any>(`${environment.baseUrl}`+'/trial/get_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{title:"Trail Report"});
  }
}