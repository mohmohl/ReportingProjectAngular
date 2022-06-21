import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from './AuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class FinanceReportService {

  constructor(private http: HttpClient,private authService : AuthenticationService) { }
  public getHOD2ReportData() : Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}`+'/getRptHOD2Data', { title : 'HOD2 Report'} );
  }

  public getLoanExcelData(branch:string, ccy:string) : Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}`+'/getLoanExcelData?branch='+branch+'&ccy='+ccy, { title : 'Loan Excel Data'} );
  }

  public getBranchList(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}`+'/getallbranch');
}

public getCurrencyList(): Observable<any>{
  return this.http.get<any>(`${environment.baseUrl}`+'/trial/get_currencyList');
}
}
