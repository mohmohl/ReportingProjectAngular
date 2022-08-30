import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/services/AuthenticationService';
import { CLinkData } from "src/models/CLinkData";

@Injectable({
    providedIn: 'root'
  })

export class CLinkReportService { 
   
  constructor(private http: HttpClient,private authService : AuthenticationService) { }

  public exportExcel(data: CLinkData): Observable<any>{
    var api = environment.baseUrl+`/clink-report/getDynamicReport`;
    return this.http.post<any>(`${api}`,data,{responseType: 'arraybuffer' as 'json'});
  }

  public dataPreparation(data: CLinkData): Observable<any>{
    let api = environment.baseUrl + `/clink-report/prepareCLinkData`;
    return this.http.post<any>(`${api}`,data);
  }

  public getTotalRecords(reportType: string): Observable<any>{
    let api = environment.baseUrl + `/clink-report/getTotalRecords?reportType=` +reportType;
    return this.http.post<any>(`${api}`,reportType);
  }
  
}