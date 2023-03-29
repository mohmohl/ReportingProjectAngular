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
  selector: 'app-eoy-liabilities',
  templateUrl: './eoy-liabilities.component.html',
  styleUrls: ['./eoy-liabilities.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class EOYLiabilitiesComponent implements OnInit {

  
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

  roundList = [];
  roundSrno;

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


    this.http.doGet("/misreport/getTrialRoundList").subscribe( resp => {
      this.loading = false;
      this.roundList = resp;
      if(this.roundList != null && this.roundList.length>0){
        this.roundSrno = this.roundList[0].roundsrno;
      }
    },
    err => {
      this.loading = false;
      debugger;
      console.log("Read getTrialRoundList err");
    });
  }

  
  clearProperties(){
    this._totOPN    = 0;
    this._totDrCash    = 0;
    this._totDrTransfer    = 0;
    this._totDrClearing    = 0;
    this._totDr    = 0;
    this._totCrCash    = 0;
    this._totCrTransfer    = 0;
    this._totCrClearing    = 0;
    this._totCr    = 0;
    this._totCLO    = 0;
  }


  showData(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;
    this.clearProperties();
    var reqData = {
      t1: fDate,
      t2: tDate,
      t3: this.branchCode, 
      t4: this.ccy,
      t5: this.type,
      t6: this.printby,
      t7: "L",
      t8: this.roundSrno
    }

    this.http.doPost('/misreport/getEOYConsoAssetDataset',reqData).subscribe(res=>{
      this._showData = true;
      if(res != null){
        this._rptTitle = "RETURN OF GENERAL LEDGER (LIABILITIES) FOR THE MONTH OF ("+this._util.getMonthName(this.toDate.getMonth(),'L')+") " + `${this.toDate.getFullYear()}` + " ("+this.ccy+" - "+this.type+")";
        this._branchData = res.branchData;
        this._datalist = res.consoDataList;
        this.calculateTotal( this._datalist);
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Read General Ledger Liabilities(ByCurrency) List Error >>> "+error)
      debugger;
    });

  }

  exportPDF(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    var reqData = {
      t1: fDate,
      t2: tDate,
      t3: this.branchCode, 
      t4: this.ccy,
      t5: this.type,
      t6: this.printby,
      t7: "L",
      t8: this.roundSrno,
      t9: ".pdf"
    }
    
    this.http.downloadFile("/misreport/downloadEOYConsoAssetFile", reqData, this.getFileName(),"pdf").subscribe(  (data: any) => {
        
        this.loading = false;
    },error => {
      console.log("Export General Ledger Liabilities(ByCurrency).pdf Error >>> "+error)
      if (error != "") {
        this.error = "(The system cannot cannot generate General Ledger Liabilities(ByCurrency).pdf!.. Have the error)";
      }
      this.loading = false;
    });

  }

  exportExcel(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;


    var reqData = {
      t1: fDate,
      t2: tDate,
      t3: this.branchCode, 
      t4: this.ccy,
      t5: this.type,
      t6: this.printby,
      t7: "L",
      t8: this.roundSrno,
      t9: ".xlsx"
    }

    this.http.downloadFile("/misreport/downloadEOYConsoAssetFile", reqData, this.getFileName(),"xlsx").subscribe(  (data: any) => {
        
      this.loading = false;
  },error => {
    console.log("General Ledger Liabilities Report Excel Exporting Error >>> " + error)
    if (error != "") {
      this.error = "(The system cannot export General Ledger Liabilities Report Excel file!.. Have the error)";
    }
    this.loading = false;
  });

  }

  
  getFileName(){
    return "General Ledger Liabilities(By Currency)_"+this.branchCode+"_"+this._util.getDDMMMYYYY(this.toDate)+"_R"+this.roundSrno;
  }


  calculateTotal(datalist){
    datalist.forEach(data => {
      this._totOPN = this._totOPN + data.opn;
      this._totCLO = this._totCLO + data.clo;
      this._totDrCash = this._totDrCash + Number(data.dr_cash);
      this._totDrTransfer = this._totDrTransfer + Number(data.dr_trf);
      this._totDrClearing = this._totDrClearing + Number(data.dr_clg);
      this._totDr = this._totDr + Number(data.dr);
      this._totCrCash = this._totCrCash + Number(data.cr_cash);
      this._totCrTransfer = this._totCrTransfer + Number(data.cr_trf);
      this._totCrClearing = this._totCrClearing + Number(data.cr_clg);
      this._totCr = this._totCr + Number(data.cr);
    });
  }

}
