import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
  export class SearchPDFService {
   
    headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
    constructor(private http: HttpClient) { 
    }
    public searchAccount(accNo:string){
        let accParam = new HttpParams().set('accountNo', accNo);
        // return this.http.get(this.api,{params:accParam});
        var api = environment.baseUrl+'/searchAccountNo?accountNo='+accNo;
         let requestOptions = { headers: this.headers, responseType: 'arraybuffer' as 'json'};
         return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
       
    }

    
    
}