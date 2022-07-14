import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';

@Injectable({
    providedIn: 'root'
  })

export class BSUserReportService { 
   
  constructor(private http: HttpClient,private authService : AuthenticationService) { }

  public exportExcel(date: string, branch: string, role: string): Observable<any>{
    var api = environment.baseUrl+'/bs-report/getDynamicReport?date=' + date + '&branch=' + branch + '&role=' + role;
    return this.http.post<any>(api,{date,branch},{responseType: 'arraybuffer' as 'json'});
  }

  public getBranchList(): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/bs-report/get_branchList?userId='+userId);
  }

}