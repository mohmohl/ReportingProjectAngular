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
  selector: 'app-conso-assets',
  templateUrl: './conso-assets.component.html',
  styleUrls: ['./conso-assets.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class ConsoAssetsComponent implements OnInit {

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
    this._uname = '';
    this._loading = true;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.readReferenceData();
    this.clearProperties();
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
    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode + '&ccy='+this.ccy+'&type='+this.type+"&printby="+this.printby+"&formtype=A";
    this.http.doGet('/misreport/getConsoAssetDataset?'+params).subscribe(res=>{
      this._showData = true;
      if(res != null){
        this._rptTitle = "RETURN OF GENERAL LEDGER (ASSETS) For the Month of ("+this._util.getMonthName(this.toDate.getMonth(),'L')+") " + `${this.toDate.getFullYear()}` + " ("+this.ccy+" - "+this.type+")";
        this._branchData = res.branchData;
        this._datalist = res.consoDataList;
        this.calculateTotal( this._datalist);
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Read General Ledger Assets(By Currency) List Error >>> "+error)
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
        a.download = "General Ledger Assets(By Currency).pdf";
        document.body.appendChild(a);
        a.click();
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("General Ledger Assets(By Currency) Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate General Ledger Assets(By Currency)!.. Have the error)";
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
        a.download = "General Ledger Assets(By Currency).xlsx";
        document.body.appendChild(a);
        a.click();
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("General Ledger Assets(By Currency) Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate General Ledger Assets(By Currency)!.. Have the error)";
            }
          this.loading = false;
        });
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
