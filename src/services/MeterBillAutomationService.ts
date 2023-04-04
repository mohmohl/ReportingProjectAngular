import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { MeterBillConfigHeader } from "src/models/MeterBillConfigHeader";
import { MeterBillAutomationUploadData } from "src/models/MeterBillAutomationUploadData";
@Injectable({
    providedIn: 'root'
  })
  export class MeterBillAutomationService {

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

    public saveConfig(data: MeterBillConfigHeader): Observable<any> {
      console.log("URL" +environment.baseUrl);
      return this.http.post<any>(`${environment.baseUrl}` + '/meterBillAutomation/saveConfig', data);
    }

    public getAllConfig():Observable<any>{
      var api = environment.baseUrl+'/meterBillAutomation/getAllConfig';
      return this.http.get<any>(`${api}`, {responseType: 'json'});
    }


    uploadFile(fileList: File[], uploadData: MeterBillAutomationUploadData[]): Observable<any>{
        let formData: FormData = new FormData();

        for (let i = 0; i < fileList.length; i++) {
          formData.append('files', fileList[i]);
        }

       // formData.append('userId', userId);
        formData.append('uploadData', JSON.stringify(uploadData));
        return this.http.post<any>(`${environment.baseUrl}/meterBillAutomation/upload`, formData);
        //return this.http.request(req);
    }

    
        
  }