import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { CashWithdrawExpAcc } from "src/models/CashWithdrawExpAcc";

@Injectable({
  providedIn: 'root'
})
export class CashWithdrawExpBCAccService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public saveBCData(data: CashWithdrawExpAcc): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}` + '/exp_bc/saveBCData', data);
  }

  public searchData(data: CashWithdrawExpAcc): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}` + '/exp_bc/searchData', data);
  }

  public deleteData(array : CashWithdrawExpAcc[]): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}` + '/exp_bc/deleteData', array);
  }

}