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

    public getCurrencyList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_currencyList');
    }

    public searchBackDateTrial(branch:string,searchDate:string,fileName:string){
        var api = environment.baseUrl+'/backDateTrial/searchBackDateTrial?branch='+branch+"&searchDate="+searchDate+"&fileName="+fileName;
        return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
    }

    public getBranchListForMigration(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/backDateTrial/migrationBranch');
  }
  public getReportListForMigration(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}`+'/backDateTrial/migrationReportTitle');
}
  
  public exportMigration_report(report_name:string,branch:string,version:string): Observable<any>{
    var api = environment.baseUrl+`/backDateTrial/download/export_migration_report?report_name=`+report_name+'&branch='+branch+'&version='+version;
    return this.http.post<any>(`${api}`,null,{responseType: 'arraybuffer' as 'json'});
  }
  public getBranchListForTTPrint(): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/denomination/getHomeBranchForDeno?userId='+userId);
  }
  public export_tt_print(branch:string): Observable<any>{
    var api = environment.baseUrl+'/ttprinting/export_tt_voucher?branch='+branch;
    return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
  }
}