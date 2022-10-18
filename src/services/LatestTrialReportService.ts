import { Injectable, Optional } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { TrialRequestData } from "src/models/TrialRequestData";

@Injectable({
  providedIn: 'root'
})
export class LatestTrialReportService {
   
    constructor(private http: HttpClient,private authService : AuthenticationService) { }

    public getBranchList(): Observable<any>{
      var userId=this.authService.currentUserValue.userId;
      return this.http.get<any>(`${environment.baseUrl}`+'/latest-trial/get_branchList?userId='+userId);
    }

    public getCurrencyList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/latest-trial/get_currencyList');
    }

    public checkSettingsDate(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/check_FrontEnd_Setting_Date`; 
      return this.http.post<any>(`${api}`,data);
    }

    // detail trial
    public getDetailTrialReportData(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/get_detail_trial_report`; 
      return this.http.post<any>(`${api}`,data);
    }
  
    public exportDetailTrialExcel(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/get_excel_detail_trial_report`; 
      return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
    }

    public exportDetailTrialPDF(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/get_pdf_detail_trial_report`; 
      return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
    }

    // general trial
    public getGeneralTrialReportData(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/get_general_trial_report`; 
      return this.http.post<any>(`${api}`,data);
    }
  
    public exportGeneralTrialExcel(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/get_excel_general_trial_report`; 
      return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});  
    }

    public exportGeneralTrialPDF(data: TrialRequestData): Observable<any>{
      let api = environment.baseUrl + `/latest-trial/get_pdf_general_trial_report`; 
      return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
    }

}