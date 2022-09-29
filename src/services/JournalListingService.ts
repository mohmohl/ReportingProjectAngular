import { Injectable, Optional } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { JournalListingData } from "src/models/JournalListingData";

@Injectable({
  providedIn: 'root'
})
export class JournalListingService {
   
    constructor(private http: HttpClient) { }

    public getBranchList(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`+'/jlisting-report/get_branchList');
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