import { Injectable, Optional } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { JournalListingData } from "src/models/JournalListingData";

@Injectable({
  providedIn: 'root'
})
export class JournalListingService {
   
    constructor(private http: HttpClient,private authService : AuthenticationService) { }
    /*
    public getBranchList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/jlisting-report/get_branchList');
    }*/

    //Access Branch >> parameter 1
    public getBranchList(formatType: number): Observable<any>{
      var userId=this.authService.currentUserValue.userId;
      return this.http.get<any>(`${environment.baseUrl}`+'/latest-trial/get_branchList?userId='+userId + '&formatType=' + formatType);
    }
	
    //home branch 
    public getBranchListForMigration(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/backDateTrial/migrationBranch');
    }
  

    public getCurrencyList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/jlisting-report/get_currencyList');
    }

    public getTransCodeList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/jlisting-report/get_transCodeList');
    }
  
    public exportJournalListingExcel(data: JournalListingData): Observable<any>{
      let api = environment.baseUrl + `/jlisting-report/download_file`; 
      return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
    }

}