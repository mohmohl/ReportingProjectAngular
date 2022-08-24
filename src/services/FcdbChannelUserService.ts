import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CCS_REPORT } from 'src/models/CCS_REPORT';
import { ACH_REPORT } from "src/models/ACH_REPORT";
import { CCSStatus } from 'src/models/CCSStatus';
import { FcdbViewModel } from "src/models/fcdb/FcdbViewModel";
@Injectable({
  providedIn: 'root'
})
export class FcdbChannelUserService {

  pdfheaders = new HttpHeaders({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

  constructor(private http: HttpClient) {
  }

  public getDuplicatedUser() {
    return this.http.get<any>(`${environment.baseUrl}` + '/fcdb/idchanneluser/duplicate-users', { responseType: 'arraybuffer' as 'json' });
  }

  public isUserExists(user_id: String) {
    return this.http.get<FcdbViewModel[]>(`${environment.baseUrl}` + '/fcdb/idchanneluser/' + user_id);
  }

  public getNewUsers() {
    return this.http.get<any>(`${environment.baseUrl}` + '/fcdb/new-user');
  }

  public downloadNewUsers() {
    return this.http.get<any>(`${environment.baseUrl}` + '/fcdb/new-user/excel', { responseType: 'arraybuffer' as 'json' });
  }

}