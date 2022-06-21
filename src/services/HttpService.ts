import { HttpClient } from '@angular/common/http';
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
}
