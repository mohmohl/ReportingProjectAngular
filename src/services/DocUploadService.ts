import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { DocUploadFilter } from 'src/models/DocUploadFilter';
import { DocUploadData } from 'src/models/DocUploadData';
@Injectable({
    providedIn: 'root'
  })
  export class DocUploadService {

    headers = new HttpHeaders({'Content-Type':'application/pdf','Accept': 'application/pdf',});
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


    public getCategoryList():Observable<any>{
        var api = environment.baseUrl+'/mabDocUpload/getCategoryList';
        return this.http.get<any>(`${api}`, {responseType: 'json'});
    }

    public getAllBranchList():Observable<any>{
      var api = environment.baseUrl+'/mabDocUpload/getAllBranchList';
      return this.http.get<any>(`${api}`, {responseType: 'json'});
  }

    public search(category: String, searchStr: String ):Observable<any>{
      var api = environment.baseUrl+'/mabDocUpload/search?category='+category+"&param="+searchStr;
      return this.http.get<any>(`${api}`, {responseType: 'json'});
    }

    public getBranchByUser( userId: String ):Observable<any>{
      var api = environment.baseUrl+'/mabDocUpload/getBranchByUser?userId='+userId;
      return this.http.get<any>(`${api}`, {responseType: 'json'});
    }

    uploadFile(fileList: File[], userId: string, branchCode: string,
               branchName: string, category: any, accountNo: any): Observable<any>{
        let formData: FormData = new FormData();

        for (let i = 0; i < fileList.length; i++) {
          formData.append('files', fileList[i]);
        }

        formData.append('userId', userId);
        formData.append('branchCode', branchCode);
        formData.append('branchName', branchName);
        formData.append('category', category);
        formData.append('accountNo', accountNo);

        const req = new HttpRequest('POST', `${environment.baseUrl}/mabDocUpload/upload`,
        formData,
        {
          reportProgress: true,
          responseType: 'json',
        });
        return this.http.post<any>(`${environment.baseUrl}/mabDocUpload/upload`, formData);
        //return this.http.request(req);
    }

    public searchDocLog(data: DocUploadFilter): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}` + '/mabDocUpload/searchDocLog', data);
    }

    public deleteDoc(data: DocUploadData): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}` + '/mabDocUpload/deleteDoc', data);
    }

    public downloadDoc(data: DocUploadData): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}` + '/mabDocUpload/downloadDoc', data,{responseType: 'arraybuffer' as 'json'});
    }
  }