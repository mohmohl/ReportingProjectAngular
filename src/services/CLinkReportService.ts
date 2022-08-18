import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { MultiBranch } from "src/models/MultiBranch";

@Injectable({
    providedIn: 'root'
  })

export class CLinkReportService { 
   
  constructor(private http: HttpClient,private authService : AuthenticationService) { }

  public exportExcel(data: MultiBranch): Observable<any>{
    var api = environment.baseUrl+`/clink-report/getDynamicReport`;
    return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
  }
  
  public getBranchList(): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/clink-report/get_branchList?userId='+userId);
  }

  public getHomeBranchList(): Observable<any>{
    var userId=this.authService.currentUserValue.userId;
    return this.http.get<any>(`${environment.baseUrl}`+'/clink-report/get_home_branchList?userId='+userId);
  }
  
}