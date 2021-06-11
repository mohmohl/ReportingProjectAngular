import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class MenuService {
    constructor(private http: HttpClient) { 
    }
  
  
    public getMenuData(): Observable<any>{
      var api = environment.baseUrl+'/getmenuListData';
     
       return this.http.get<any>(api);
  }
 
  }