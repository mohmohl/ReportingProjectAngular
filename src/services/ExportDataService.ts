import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ExportDataService {
    headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
    constructor(private http: HttpClient) { 
    }
  
    public export_excel(url:string){
    
        var api = environment.baseUrl+url;
        // let requestOptions = { headers: this.headers, responseType: 'arraybuffer' as 'json'};
         return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
       
    }
    public export_PDF(url:string){
      var api = environment.baseUrl+url;
       let requestOptions = { headers: this.headers, responseType: 'arraybuffer' as 'json'};
       return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
     
  }
}