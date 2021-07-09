import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MPUISTService {
 
  constructor(private http: HttpClient) {
  }

   public validateFile(formdata:FormData): Observable<any>{ 
     var api = environment.baseUrl + `/mpuist/validate`;
     return this.http.post<any>(`${api}`, formdata);
   }

   public previewFile(formdata:FormData,filetype:string): Observable<any>{ 
      if(filetype==='INC_01C'){
        var api = environment.baseUrl + `/mpuist/preview/inc-01c`;
      }else if(filetype==='INC_01R'){
        var api = environment.baseUrl + `/mpuist/preview/inc-01r`;
      }else if(filetype==='INC_01S'){
        var api = environment.baseUrl + `/mpuist/preview/inc-01s`;
      }else if(filetype==='INC_11C'){
        var api = environment.baseUrl + `/mpuist/preview/inc-11c`;
      }else if(filetype==='INC_11S'){
        var api = environment.baseUrl + `/mpuist/preview/inc-11s`;
      }else if(filetype==='IND_01ACOM'){
        var api = environment.baseUrl + `/mpuist/preview/ind-01acom`;
      }else if(filetype==='IND_01ICOM'){
        var api = environment.baseUrl + `/mpuist/preview/ind-01icom`;
      }else if(filetype==='IND_01IERR'){
        var api = environment.baseUrl + `/mpuist/preview/ind-01ierr`;
      }else if(filetype==='IND_01SCOM'){
        var api = environment.baseUrl + `/mpuist/preview/ind-01scom`;
      } 
      return this.http.post<any>(`${api}`, formdata);
  }

  public saveFile(formdata:FormData): Observable<any>{
    let api = environment.baseUrl + `/mpuist/import`;
    return this.http.post<any>(`${api}`, formdata);
  }
}
