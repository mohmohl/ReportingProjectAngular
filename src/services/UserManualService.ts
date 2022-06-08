import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { ManualFileDir } from "src/models/userManual/ManualFileDir";
import { ManualRole } from "src/models/userManual/ManualRole";
@Injectable({
    providedIn: 'root'
  })
export class UserManualService { 
   
    constructor(private http: HttpClient,private authService : AuthenticationService) { 
    }

    public getFileList(): Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}`+'/user-manual/getFileList');
    }

    public searchManualFile(id:string,fileType: string){
      var api = environment.baseUrl+'/user-manual/searchManualFile?id='+id+ '&fileType=' + fileType;
      return this.http.get<any>(`${api}`, {responseType: 'arraybuffer' as 'json'});
  }

  public saveUserManual(data: ManualFileDir): Observable<any>{
    let api = environment.baseUrl + `/user-manual/saveManualDir`;
    return this.http.post<any>(`${api}`,data);
  }

  public getFileNameList(roleId: string): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}`+'/user-manual/getFileNameList?roleId=' + roleId);
  }

  public saveUserManualRole(data: ManualRole): Observable<any>{
    let api = environment.baseUrl + `/user-manual/saveManualRole`;
    return this.http.post<any>(`${api}`,data);
  }






}