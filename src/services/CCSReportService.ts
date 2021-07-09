import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CCS_REPORT } from 'src/models/CCS_REPORT'; 
@Injectable({
  providedIn: 'root'
})
export class CCSReportService {

  pdfheaders = new HttpHeaders({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

  constructor(private http: HttpClient) {
  }

  public getEBABankList(): Observable<any>{
    var api = environment.baseUrl + '/ccs/bank';
    return this.http.get<any>(`${api}`);
  }

  public exportCCSOutwardPdf(searchbody: CCS_REPORT) {
    let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
    let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;
 
    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/ccsoutward'; 
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportCCSInwardPdf(searchbody: CCS_REPORT) {
    let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
    let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;
 
    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/ccsinward'; 
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }


  public exportCCSOutwardExcel(searchbody: CCS_REPORT) {
    let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
    let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/ccsoutward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportCCSInwardExcel(searchbody: CCS_REPORT) { 
    let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
    let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;
 
    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/ccsinward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }


  public getCCSOutwardWebFirstPage(searchbody: CCS_REPORT): Observable<any>{
    let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
    let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;
 
    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + `/ccs/outward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json"});
  }

  public getCCSOutwardWeb(searchbody: CCS_REPORT): Observable<any>{
    let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
    let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;
 
    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + `/ccs/outward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json"});
  }

  public getCCSInwardWeb(searchbody: CCS_REPORT): Observable<any>{
   let fromDateStr=`${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth()+1}-${searchbody.fromdate.getDate()}`;
   let toDateStr=`${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth()+1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status_type:searchbody.statusCode,
      transition_name:searchbody.ccsTranCode,
      bank_name:searchbody.bankCode
    }
    var api = environment.baseUrl + `/ccs/inward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json"});
  }
}