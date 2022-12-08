import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";
import { InstrumentAPIRequestMessage } from "src/models/InstrumentAPIRequestMessage";

@Injectable({
    providedIn: 'root'
  })

  export class InstrumentService{
    constructor(private http: HttpClient,private authenticationService: AuthenticationService) { 
    }

    public checkInstrumentData(data : InstrumentAPIRequestMessage) : Observable<any>{
        debugger;
        return this.http.post<any>(`${environment.baseUrl}`+'/tt_update/checkInstrumentData',data);
    }

    public updateData(data : InstrumentAPIRequestMessage) : Observable<any>{
        debugger;
        return this.http.post<any>(`${environment.baseUrl}`+'/tt_update/updateData',data);
    }

}