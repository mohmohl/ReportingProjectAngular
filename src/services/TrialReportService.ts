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

    // detail trial
    public getTrialReportData(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{
       return this.http.post<any>(`${environment.baseUrl}`+'/trial/get_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{title:"Detail Trail Report"});
    }
  
    public exportDetailTrialExcel(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{
       return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_excel_detail_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{responseType: 'arraybuffer' as 'json'});
    }

    public exportDetailTrialPDF(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_pdf_detail_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{responseType: 'arraybuffer' as 'json'});
    }

    // general trial
    public getGeneralTrialReportData(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{
      return this.http.post<any>(`${environment.baseUrl}`+'/trial/get_general_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{title:"General Trail Report"});
    }
  
    public exportGeneralTrialExcel(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_excel_general_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{responseType: 'arraybuffer' as 'json'});
    }

    public exportGeneralTrialPDF(fromDate:string,branchCode:string,ccy_code:string): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_pdf_general_trial_report?fromDate='+fromDate+'&branchCode='+branchCode+'&ccy_code='+ccy_code,{responseType: 'arraybuffer' as 'json'});
    }

}