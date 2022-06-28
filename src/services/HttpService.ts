import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public doGet(url:string): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}`+url);
  }


  public doPost(url:string, j:any): Observable<any>{

   return this.http.post<any>(`${environment.baseUrl}`+ url,{title:j});
  }

  headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
    
  public export_excel(url:string){
  
      var api = environment.baseUrl+url;
        return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
      
  }
  public export_PDF(url:string){
    var api = environment.baseUrl+url;
      let requestOptions = { headers: this.headers, responseType: 'arraybuffer' as 'json'};
      return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
    
  }
}
