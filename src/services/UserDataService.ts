import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from "./AuthenticationService";

@Injectable({
    providedIn: 'root'
  })
  export class UserDataService {
    constructor(private http: HttpClient,private authenticationService: AuthenticationService) { 
    }
  
  
    public getFcubUserData(user_id:string): Observable<any>{
      
       return this.http.post<any>(`${environment.baseUrl}`+'/user/getFcubActiveUser?userId='+user_id,{ title: 'Fcubs user Data' });
  }

  public createApplicationAccount(user_id: string, password: string,menuId:string[]) {
    var createdUserId = this.authenticationService.currentUserValue.userId;
    return this.http.post(`${environment.baseUrl}/user/createApplicationAccount`, { user_id, password,menuId,createdUserId });

}
  public changePassword(password: string,newpassword:string) {
    var createdUserId = this.authenticationService.currentUserValue.userId;
    var user_id =createdUserId;
    return this.http.post<any>(`${environment.baseUrl}/user/changePassword`, { user_id, password,newpassword,createdUserId});

  }
  public getMobileLoginUserData(phoneNo:string): Observable<any>{
      
    return this.http.post<any>(`${environment.baseUrl}`+'/smsAuthenticate/sendingSMSData/'+phoneNo,{ title: 'Mobile Login Data' });
}

public checkUserForRegistration(userId:string): Observable<any>{
      
  return this.http.post<any>(`${environment.baseUrl}`+'/smsAuthenticate/checkNewUserAndSendingSMSData/'+userId,{ title: 'Check User' });
}
public forgotPassword(userId:string): Observable<any>{
      
  return this.http.post<any>(`${environment.baseUrl}`+'/smsAuthenticate/forgotPasswordSendingSMSData/'+userId,{ title: 'Forgot Password' });
}
  }