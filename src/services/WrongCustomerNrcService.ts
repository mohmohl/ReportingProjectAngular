import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { WrongCustomerNrcFilter } from 'src/models/WrongCustomerNrcFilter';
import { WrongCustomerData } from 'src/models/WrongCustomerData';
@Injectable({
    providedIn: 'root'
  })
  export class WrongCustomerNrcService {

    httpOptions:any;
    constructor(private http: HttpClient,private authenticationService: AuthenticationService) { 
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' ,
          'Authorization': 'Bearer '+this.authenticationService.currentUserValue.token ,
          'Accept' : 'application/json'
        })
      };
    }


    public getAllBranchList():Observable<any>{
      var api = environment.baseUrl+'/wrongCustomerNrc/getAllBranchList';
      return this.http.get<any>(`${api}`, {responseType: 'json'});
    }
    public getBranchByUser( userId: String ):Observable<any>{
      var api = environment.baseUrl+'/wrongCustomerNrc/getBranchByUser?userId='+userId;
      return this.http.get<any>(`${api}`, {responseType: 'json'});
    }

    public download(branchCode: String): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}` + '/wrongCustomerNrc/download', branchCode,{responseType: 'json'});
    }

    public search(data: WrongCustomerNrcFilter): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}` + '/wrongCustomerNrc/searchCustomer', data);
    }

    public update(data: WrongCustomerData[]): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}` + '/wrongCustomerNrc/updateCustomer', data);
    }

    public searchCustomer(searchStr: String ):Observable<any>{
      var api = environment.baseUrl+'/wrongCustomerNrc/searchCustomer?param='+searchStr;
      return this.http.get<any>(`${api}`, {responseType: 'json'});
    }
    
  }