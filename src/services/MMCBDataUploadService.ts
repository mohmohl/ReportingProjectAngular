import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class MMCBDataUploadService {
    constructor(private http: HttpClient) { 
    }

    public uploadCMSLossFile(data:FormData): Observable<any>{
        let api = environment.baseUrl + `/mmcbDataUpload/uploadCMSLossFile`;
        return this.http.post<any>(`${api}`,data);
      }
}