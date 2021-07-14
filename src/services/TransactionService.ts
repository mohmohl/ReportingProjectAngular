import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class TransactionService {
    constructor(private http: HttpClient) { 
    }
    public getTesting(){
      
       return "I am Testing";
       
    }
    public getTestingData(){
       
         return this.http.get(`${environment.baseUrl}`+'/welcome',{responseType: 'text'});
    }

    public getTransctionData(): Observable<any>{

     
       return this.http.post<any>(`${environment.baseUrl}`+'/get_transaction',{ title: 'Transaction Data' });
  }
 
  }