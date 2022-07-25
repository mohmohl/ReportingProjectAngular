import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { MultiBranch } from "src/models/MultiBranch";

@Injectable({
    providedIn: 'root'
  })

export class BSUserReportService { 
   
  constructor(private http: HttpClient,private authService : AuthenticationService) { }

  public exportExcel(data: MultiBranch): Observable<any>{
    var api = environment.baseUrl+`/bs-report/getDynamicReport`;
    return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
  }
  
  public getBranchList(): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/bs-report/get_branchList?userId='+userId);
  }

  public exportHomeBranchExcel(data: MultiBranch): Observable<any>{
    var api = environment.baseUrl+`/bs-report/getHomeBranchDynamicReport`;
    return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
  }
  
  public getHomeBranchList(): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/bs-report/get_home_branchList?userId='+userId);
  }
  
}