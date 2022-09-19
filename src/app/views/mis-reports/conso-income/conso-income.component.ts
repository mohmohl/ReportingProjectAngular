import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-conso-income',
  templateUrl: './conso-income.component.html',
  styleUrls: ['./conso-income.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class ConsoIncomeComponent implements OnInit {

  loading;
  error;
  _rptTitle;
  _branchData;
  _datalist;
  _showData;
  _noData;
  _uname;
  _loading;
  _branchList;
  _ccyList;
  _printCcyTypeList;
  _printByList;
  branchCode : string = '';
  ccy;
  type;
  printby;

  fromDate: Date;
  toDate: Date;

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();

  _totOPN : number = 0;
  _totDrCash : number = 0;
  _totDrTransfer : number = 0;
  _totDrClearing : number = 0;
  _totDr : number = 0;
  _totCrCash : number = 0;
  _totCrTransfer : number = 0;
  _totCrClearing : number = 0;
  _totCr : number = 0;
  _totCLO : number = 0;

  constructor(private http : HttpService, private _util : CommonUtil) { }

  ngOnInit() {
    this._uname = 'mmm';
    this._loading = true;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.readReferenceData();
  }

  readReferenceData(){

    //branch list
    this.http.doGet("/misreport/getAllBranchesByUser?uname="+this._uname).subscribe( resp => {
        this._loading = false;
        this._branchList = resp;
        if(this._branchList != null && this._branchList.length>0){
          this.branchCode = this._branchList[0].code;
        }
    },
    err => {
      this._loading = false;
      debugger;
      console.log("Read getAllBranchesByUser err");
    });

    //ccy list
    this.http.doGet("/misreport/getAllCurrency").subscribe( resp => {
      this._loading = false;
      this._ccyList = resp;
      if(this._ccyList != null && this._ccyList.length>0){
        this.ccy = this._ccyList[0].t1;
      }
    },
    err => {
      this._loading = false;
      debugger;
      console.log("Read getAllCurrency err");
    });

    //print ccy list
    this.http.doGet("/misreport/getPrintCcyType").subscribe( resp => {
      this._loading = false;
      this._printCcyTypeList = resp;
      if(this._printCcyTypeList != null && this._printCcyTypeList.length>0){
        this.type = this._printCcyTypeList[0].code;
      }
    },
    err => {
      this._loading = false;
      debugger;
      console.log("Read getPrintCcyType err");
    });

    //print by list
    this.http.doGet("/misreport/getPrintBy").subscribe( resp => {
      this._loading = false;
      this._printByList = resp;
      if(this._printByList != null && this._printByList.length>0){
        this.printby = this._printByList[0].code;
      }
    },
    err => {
      this._loading = false;
      debugger;
      console.log("Read getPrintBy err");
    });


  }

  showData(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode + '&ccy='+this.ccy+'&type='+this.type+"&printby="+this.printby+"&formtype=A";
    this.http.doGet('/misreport/getConsoIncomeDataset?'+params).subscribe(res=>{
      this._showData = true;
      if(res != null){
        this._datalist = res.datalist;
        this._util.groupBy(this._datalist, rpts1 => (rpts1.rpts1 +"|" + rpts1.gl_group));
       
        this._rptTitle = "STATEMENT OF INCOME FOR THE MONTH OF ("+this._util.getMonthName(this.toDate.getMonth(),'L')+") year ("+this.ccy+" - "+ this.type+")";
        this._branchData = res.branchData;
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Read Currency List Error >>> "+error)
      debugger;
    });

  }

  exportPDF(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode + '&ccy='+this.ccy+'&type='+this.type+"&printby="+this.printby+"&filetype=.pdf"+"&formtype=A";
    this.http.export_PDF("/misreport/downloadConsoAssetFile?"+params).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/pdf"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download = "ConsoAsset.pdf";
        document.body.appendChild(a);
        a.click();
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("Detail Trial Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate detail trial!.. Have the error)";
            }
          this.loading = false;
        });
  }

  exportExcel(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode + '&ccy='+this.ccy+'&type='+this.type+"&printby="+this.printby+"&filetype=.xlsx"+"&formtype=A";
    this.http.export_PDF("/misreport/downloadConsoAssetFile?"+params).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/vnd.ms-excel'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download = "ConsoAsset.xlsx";
        document.body.appendChild(a);
        a.click();
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("Detail Trial Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate detail trial!.. Have the error)";
            }
          this.loading = false;
        });
  }

  calculateOPNTotal(amount){
      this._totOPN = this._totOPN + amount;
  }

  calculateCLOTotal(amount){
    this._totCLO = this._totCLO + amount;
  }

  calculateDrCashTotal(amount){
    this._totDrCash = this._totDrCash + amount;
  }

  calculateDrTransferTotal(amount){
    this._totDrTransfer = this._totDrTransfer + amount;
  }
  
  calculateDrClearingTotal(amount){
    this._totDrClearing = this._totDrClearing + amount;
  }

  calculateDrTotal(amount){
    this._totDr = this._totDr + amount;
  }

  calculateCrCashTotal(amount){
    this._totCrCash = this._totCrCash + amount;
  }

  calculateCrTransferTotal(amount){
    this._totCrTransfer = this._totCrTransfer + amount;
  }
  
  calculateCrClearingTotal(amount){
    this._totCrClearing = this._totCrClearing + amount;
  }

  calculateCrTotal(amount){
    this._totCr = this._totCr + amount;
  }

}
