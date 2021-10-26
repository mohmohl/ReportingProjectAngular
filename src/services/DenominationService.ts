import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { DenominationModel } from "src/models/DenominationModel";
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
}