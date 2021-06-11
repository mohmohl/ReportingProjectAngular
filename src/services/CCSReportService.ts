import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CCS_REPORT } from 'src/models/CCS_REPORT'; 
@Injectable({
  providedIn: 'root'
})
export class CCSReportService {

  pdfheaders = new HttpHeaders({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf', });

  constructor(private http: HttpClient) {
  }

  public getEBABankList(): Observable<any>{
    var api = environment.baseUrl + '/ccs/bank';
    return this.http.get<any>(`${api}`);
  }

  public exportCCSOutwardPdf(searchbody: CCS_REPORT) {
    debugger;
    // let accParam = new HttpParams().set('accountNo', accNo);
    // return this.http.get(this.api,{params:accParam});
    let fromdate_str: string = searchbody.fromdate.getFullYear() + '-' + (searchbody.fromdate.getMonth() + 1) + '-' + searchbody.fromdate.getDate();
    let todate_str: string = searchbody.todate.getFullYear() + '-' + (searchbody.todate.getMonth() + 1) + '-' + searchbody.todate.getDate();
    let requestbody = {
      fromdate: fromdate_str,
      todate: todate_str,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/ccsoutward'; 
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportCCSInwardPdf(searchbody: CCS_REPORT) {
    let fromdate_str: string = searchbody.fromdate.getFullYear() + '-' + (searchbody.fromdate.getMonth() + 1) + '-' + searchbody.fromdate.getDate();
    let todate_str: string = searchbody.todate.getFullYear() + '-' + (searchbody.todate.getMonth() + 1) + '-' + searchbody.todate.getDate();
    let requestbody = {
      fromdate: fromdate_str,
      todate: todate_str,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/ccsinward'; 
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }


  public exportCCSOutwardExcel(searchbody: CCS_REPORT) {
    let fromdate_str: string = searchbody.fromdate.getFullYear() + '-' + (searchbody.fromdate.getMonth() + 1) + '-' + searchbody.fromdate.getDate();
    let todate_str: string = searchbody.todate.getFullYear() + '-' + (searchbody.todate.getMonth() + 1) + '-' + searchbody.todate.getDate();
    let requestbody = {
      fromdate: fromdate_str,
      todate: todate_str,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/ccsoutward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportCCSInwardExcel(searchbody: CCS_REPORT) {
    let fromdate_str: string = searchbody.fromdate.getFullYear() + '-' + (searchbody.fromdate.getMonth() + 1) + '-' + searchbody.fromdate.getDate();
    let todate_str: string = searchbody.todate.getFullYear() + '-' + (searchbody.todate.getMonth() + 1) + '-' + searchbody.todate.getDate();
    let requestbody = {
      fromdate: fromdate_str,
      todate: todate_str,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/ccsinward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }
}