import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { map } from 'rxjs/operators';
import { CommonUtil } from 'src/app/shared/common-util';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { HttpService } from 'src/services/HttpService';

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@Component({
  selector: 'app-conso-trial-report',
  templateUrl: './conso-trial-report.component.html',
  styleUrls: ['./conso-trial-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class ConsoTrialReportComponent implements OnInit {

  loading;
  error;
  currencyList;
  ccyCode;
  _ccyCode;
  _showData;
  _datalist;
  fromDate : Date;
  _refData;
  _rptTitle;
  data_message;

  totalDebit;
  totalCredit;


  constructor(private http : HttpService, private _util : CommonUtil) { }

  ngOnInit() {
    this.fromDate = new Date();
    this.readReference();
  }

  readReference(){
    this.loading = true;
    this.http.doGet("/misreport/getAllMISCurrency").subscribe( resp => {
        this.loading = false;
        this.currencyList = resp;
        
        if(this.currencyList != null && this.currencyList.length>0){
          this.ccyCode = this.currencyList[0];
        }
        
    },
    err => {
      this.loading = false;
      debugger;
      console.log("Read getAllMISCurrency err");
    });

  }

  showData(){
    this.loading = true;
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let reportCriteria = {"t1":fDate,"t2":this.ccyCode};

    this.http.doPost("/misreport/getConsoTrialDataset", reportCriteria).subscribe(res=>{
      this._showData = true;
      if(res != null){
        this._datalist = res.datalist;
        this._refData = res.reference;
        this._ccyCode = this.ccyCode;
        this._rptTitle="Consolidated Trial As at ("+this._util.getDDMMYYYY(this.fromDate)+")";
        this.calculateTotal(this._datalist);
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Read Conso Trial List Error >>> "+error)
      debugger;
    });

  }

  calculateTotal(datalist:any){
    this.totalCredit = 0;
    this.totalDebit = 0;
    datalist.forEach(data => {
      this.totalCredit += data.credit_lcy;
      this.totalDebit += data.debit_lcy;
     
    });
  }

  exportexcel(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    this.loading = true;

    let reportCriteria = {"t1":fDate,"t2":this.ccyCode,"t3":"xlsx"};
    let url = '/misreport/downloadConsoTrialFile';
    this.http.downloadFile(url, reportCriteria, 'ConsoTrial', 'xlsx').subscribe(res => { 
      this.loading = false;
    },
      error => {
        console.log("Conso Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate conso trial!.. Have the error)";
          }
        this.loading = false;
      });
  }


  exportPDF(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    this.loading = true;

    let reportCriteria = {"t1":fDate,"t2":this.ccyCode,"t3":"pdf"};
    let url = '/misreport/downloadConsoTrialFile';
    this.http.downloadFile(url, reportCriteria, 'ConsoTrial', 'pdf').subscribe(res => { 
      this.loading = false;
    },
      error => {
        console.log("Conso Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate conso trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

}
