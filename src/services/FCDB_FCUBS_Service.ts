import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";

@Injectable({
  providedIn: 'root'
})
export class FCDBAndFCUBSService{
    constructor(private http: HttpClient) { 
    }

    public getBranchList(): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/fcdbAndFcubs/get_fcdb_fcubs_branch_list');
      }

      public export_fcub_fcdb_Excel(branchCode:string): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/fcdbAndFcubs/get_excel_fcubs_fcdb_report?branchCode='+branchCode,{responseType: 'arraybuffer' as 'json'});
     }

     
}