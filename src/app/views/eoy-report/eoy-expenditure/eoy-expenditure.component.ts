import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
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
  selector: 'app-eoy-expenditure',
  templateUrl: './eoy-expenditure.component.html',
  styleUrls: ['./eoy-expenditure.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class EOYExpenditureComponent implements OnInit {

  loading;
  error;
  _rptTitle;
  _branchData;
  _datalist;
  g_datalist;
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

  _subTotOPN : number = 0;
  _subTotDrCash : number = 0;
  _subTotDrTransfer : number = 0;
  _subTotDrClearing : number = 0;
  _subTotDr : number = 0;
  _subTotCrCash : number = 0;
  _subTotCrTransfer : number = 0;
  _subTotCrClearing : number = 0;
  _subTotCr : number = 0;
  _subTotCLO : number = 0;

  constructor(private http : HttpService, private _util : CommonUtil, private cdf : ChangeDetectorRef) { }

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

    this.clearSubTotal();
  }

  clearSubTotal(){
      //sub total
      this._subTotOPN    = 0;
      this._subTotDrCash    = 0;
      this._subTotDrTransfer    = 0;
      this._subTotDrClearing    = 0;
      this._subTotDr    = 0;
      this._subTotCrCash    = 0;
      this._subTotCrTransfer    = 0;
      this._subTotCrClearing    = 0;
      this._subTotCr    = 0;
      this._subTotCLO    = 0;
  }

  showData(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;
    let reportCriteria = {"t1":fDate,"t2":tDate, "t3":this.branchCode, "t4":this.ccy, "t5":this.type, "t6":this.printby, "t8":"E"};
    this.clearProperties();

    this.http.doPost('/misreport/getConsoIncomeDataset', reportCriteria).subscribe(res=>{
     
      this._showData = true;
      if(res != null){
        this._datalist = res.datalist;
        this.g_datalist = this.groupBy(this._datalist, rpts1 => (rpts1.rpts1 +"|" + rpts1.gl_group));
       
        this._rptTitle = "STATEMENT OF EXPENDITURE FOR THE MONTH OF ("+this._util.getMonthName(this.toDate.getMonth(),'L')+") year ("+this.ccy+" - "+ this.type+")";
        this._branchData = res.branchInfo;
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Read Conso Expenditure List Error >>> "+error)
      debugger;
    });

  }

  public keepOriginalOrder = (a, b) => a.key;

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((data) => {
        
         const key = keyGetter(data);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [data]);
         } else {
             collection.push(data);
         }

         //caculate grand total
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
   
    return (map);
}


exportExcel(){
 
  let fDate = this._util.getDDMMMYYYY(this.fromDate);
  let tDate = this._util.getDDMMMYYYY(this.toDate);
  this.loading = true;
  let reportCriteria = {"t1":fDate,"t2":tDate, "t3":this.branchCode, "t4":this.ccy, "t5":this.type, "t6":this.printby,"t7":"xlsx", "t8":"E"};

  //let reportCriteria = {"t1":fDate,"t2":this.ccyCode,"t3":"xlsx"};
  let url = '/misreport/downloadConsoIncomeFile';
  this.http.downloadFile(url, reportCriteria, 'Statement of Expenditure', 'xlsx').subscribe(res => { 
    this.loading = false;
  },
    error => {
      console.log("Conso Expenditure Excel Error >>> "+error)
      debugger;
      if(error != ""){
      this.error = "(The system cannot cannot generate conso Expenditure Excel!.. Have the error)";
        }
      this.loading = false;
    });
}


exportPDF(){
  let fDate = this._util.getDDMMMYYYY(this.fromDate);
  let tDate = this._util.getDDMMMYYYY(this.toDate);
  this.loading = true;
  let reportCriteria = {"t1":fDate,"t2":tDate, "t3":this.branchCode, "t4":this.ccy, "t5":this.type, "t6":this.printby,"t7":"pdf","t8":"E"};

  //let reportCriteria = {"t1":fDate,"t2":this.ccyCode,"t3":"pdf"};
  let url = '/misreport/downloadConsoIncomeFile';
  this.http.downloadFile(url, reportCriteria, 'Statement of Expenditure', 'pdf').subscribe(res => { 
    this.loading = false;
  },
    error => {
      console.log("Conso Expenditure PDF Error >>> "+error)
      debugger;
      if(error != ""){
      this.error = "(The system cannot cannot generate conso Expenditure PDF!.. Have the error)";
        }
      this.loading = false;
    });
}

  getGLGroup(keyStr){
    var newarr = keyStr.split("|");
    return newarr[1];
  }

  calculateSubTotal(datalist){
    this.clearSubTotal();
    datalist.forEach(data => {
      this._subTotOPN += data.opn;
      this._subTotCLO += data.clo;
      this._subTotDrCash += Number(data.dr_cash);
      this._subTotDrTransfer += Number(data.dr_trf);
      this._subTotDrClearing += Number(data.dr_clg);
      this._subTotDr += Number(data.dr);
      this._subTotCrCash += Number(data.cr_cash);
      this._subTotCrTransfer += Number(data.cr_trf);
      this._subTotCrClearing += Number(data.cr_clg);
      this._subTotCr += Number(data.cr);
    })
   
  }
}
