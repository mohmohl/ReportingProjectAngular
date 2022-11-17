import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { DenominationModel } from "src/models/DenominationModel";
import { DenoCashInHand } from "src/models/denoCashInHand";
import { Deno_Header } from "src/models/Deno_Header";
@Injectable({
  providedIn: 'root'
})
export class DenominationService {
    constructor(private http: HttpClient,private authService : AuthenticationService) { 
    }
    public importData(data:DenominationModel): Observable<any>{

        return this.http.post<any>(`${environment.baseUrl}`+'/CMD_DT_01/save',data);
    }
    public exportExcel(importDate:string): Observable<any>{

      return this.http.get<any>(`${environment.baseUrl}`+'/CMD_DT_01/export?date='+importDate,{responseType: 'arraybuffer' as 'json'});
  }
  public getBranchList(formatType: number): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/latest-trial/get_branchList?userId='+userId + '&formatType=' + formatType);
  }

  public getCashInHand(data:DenoCashInHand){

    return this.http.post<any>(`${environment.baseUrl}`+'/denomination/getCashInHandAmount',data);
}

public deno_data_daily_update(data:Deno_Header){
debugger
  return this.http.post<any>(`${environment.baseUrl}`+'/denomination/saveDenominationData',data);
}

public getCCYListForDeno(): Observable<any>{

  return this.http.post<any>(`${environment.baseUrl}`+'/denomination/getCCYListForDeno',null);
}

public getCodeAndValueListForDeno(ccy:string): Observable<any>{
  return this.http.post<any>(`${environment.baseUrl}`+'/denomination/getCodeAndValueListForDeno?ccy='+ccy,null);
}

public getDenoReport(data:DenoCashInHand){

  return this.http.post<any>(`${environment.baseUrl}`+'/denomination/getDeno_data_list',data);
}
}