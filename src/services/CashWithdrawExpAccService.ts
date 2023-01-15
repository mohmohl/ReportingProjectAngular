import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { CashWithdrawExpAcc } from "src/models/CashWithdrawExpAcc";

@Injectable({
    providedIn: 'root'
  })

  export class CashWithdrawExpAccService{
    constructor(private http: HttpClient,private authenticationService: AuthenticationService) { 
    }

    public getRefreshData(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/exp/getRefreshData');
    }

    public getSearchData(cust_ac_no : string,status : string) : Observable<any>{
      return this.http.post<any>(`${environment.baseUrl}`+'/exp/getSearchData',{cust_ac_no,status});
    }

    public saveData(data : CashWithdrawExpAcc) : Observable<any>{
      debugger;
      return this.http.post<any>(`${environment.baseUrl}`+'/exp/saveData',data);
    }

    public searchEditData(cust_ac_no : string,channel_name : string) : Observable<any>{
      return this.http.post<any>(`${environment.baseUrl}`+'/exp/searchEditData',{cust_ac_no,channel_name});
    }

    public saveEditData(data : CashWithdrawExpAcc) : Observable<any>{
      return this.http.post<any>(`${environment.baseUrl}`+'/exp/saveEditData',data);
    }

    public getChannelList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/exp/getChannelList');
    }

  }