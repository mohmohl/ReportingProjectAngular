import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CCS_REPORT } from 'src/models/CCS_REPORT';
import { ACH_REPORT } from "src/models/ACH_REPORT";
import { CCSStatus } from 'src/models/CCSStatus';
@Injectable({
  providedIn: 'root'
})
export class CCSReportService {

  pdfheaders = new HttpHeaders({ 'Content-Type': 'application/pdf', 'Accept': 'application/pdf' });

  constructor(private http: HttpClient) {
  }

  private renderCCSStatus(status_code:String):CCSStatus{
    let status:CCSStatus=new CCSStatus();
    switch(status_code){
      case 'ALL':{
        status.status_code='ALL';
        status.description='ALL';
        break;
      }
      case 'CBMRE':{
        status.status_code='CBMRE';
        status.description='Failed';
        break;
      }
      case 'SC':{
        status.status_code='SC';
        status.description='Core Banking Success';
        break;
      }
      case 'F':{
        status.status_code='F';
        status.description='Inward Failed';
        break;
      }
      case 'FRC':{
        status.status_code='FRC';
        status.description='Outward Reversal Failed';
        break;
      }
      case 'SRC':{
        status.status_code='SRC';
        status.description='Outward Reversal Success';
        break;
      }
      case 'FCBS':{
        status.status_code='FCBS';
        status.description='Inward Failed & Reversal';
        break;
      }
    }
    return status;
  }

  public getEBABankList(): Observable<any> {
    var api = environment.baseUrl + '/ccs/bank';
    return this.http.get<any>(`${api}`);
  }

  public getCCSStatusList(): Observable<any> {
    var api = environment.baseUrl + '/ccs/status';
    return this.http.get<any>(`${api}`);
  }

  public exportCCSOutwardPdf(searchbody: CCS_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/ccsoutward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportACHOutwardPdf(searchbody: CCS_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/achoutward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportCCSInwardPdf(searchbody: CCS_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/ccsinward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportACHInwardPdf(searchbody: ACH_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/pdf/achinward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }


  public exportCCSOutwardExcel(searchbody: CCS_REPORT) {


    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code: searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/ccsoutward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportACHOutwardExcel(searchbody: CCS_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/achoutward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportCCSInwardExcel(searchbody: CCS_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/ccsinward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }

  public exportACHInwardExcel(searchbody: ACH_REPORT) {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + '/export/excel/achinward';
    return this.http.post<any>(`${api}`, requestbody, { responseType: 'arraybuffer' as 'json' });
  }


  public getCCSOutwardWebFirstPage(searchbody: CCS_REPORT): Observable<any> {

    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + `/ccs/outward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json" });
  }

  public getCCSOutwardWeb(searchbody: CCS_REPORT): Observable<any> {

    debugger;
    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code: searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + `/ccs/outward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json" });
  }

  public getACHOutwardWeb(searchbody: CCS_REPORT): Observable<any> {

    debugger;
    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;


    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + `/ach/outward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json" });
  }

  public getCCSInwardWeb(searchbody: CCS_REPORT): Observable<any> {
    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + `/ccs/inward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json" });
  }

  public getACHInwardWeb(searchbody: ACH_REPORT): Observable<any> {
    console.log("searchbody>>> " + JSON.stringify(searchbody));
    let fromDateStr = `${searchbody.fromdate.getFullYear()}-${searchbody.fromdate.getMonth() + 1}-${searchbody.fromdate.getDate()}`;
    let toDateStr = `${searchbody.todate.getFullYear()}-${searchbody.todate.getMonth() + 1}-${searchbody.todate.getDate()}`;

    let requestbody = {
      fromdate: fromDateStr,
      todate: toDateStr,
      status: this.renderCCSStatus(searchbody.statusCode),
      status_code : searchbody.statusCode,
      transition_name: searchbody.ccsTranCode,
      bank_name: searchbody.bankCode
    }
    var api = environment.baseUrl + `/ach/inward`;
    return this.http.post<any>(`${api}`, requestbody, { responseType: "json" });
  }
}