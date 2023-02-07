import { Component, OnInit } from '@angular/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { HttpService } from 'src/services/HttpService';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@Component({
  selector: 'app-gl-transaction',
  templateUrl: './gl-transaction.component.html',
  styleUrls: ['./gl-transaction.component.css']
})
export class GLTransactionComponent implements OnInit {

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
  branchCode: string = '';
  ccy;

  fromDate: Date;

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();

  constructor(private latestTriService: LatestTrialReportService, private http: HttpService, private _util: CommonUtil) {

  }

  ngOnInit() {

    this._uname = '';
    this._loading = true;
    this.fromDate = new Date();
    this.readReferenceData();
  }

  readReferenceData() {

    this.loading = true;

    this.latestTriService.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
     this._branchList = res;
     this._branchList.push("ALL");
     this.branchCode = "ALL";
    });

    //ccy list
    this.http.doGet("/misreport/getAllCurrency").subscribe( resp => {
      this._loading = false;
      this._ccyList = resp;
      if(this._ccyList != null && this._ccyList.length>0){
        this.ccy = this._ccyList[0].t1;
        this._ccyList.push(
          {"code":null,"description":null,"fdate":null,"tdate":null,"t1":"All FE Currency","t2":null,"t3":null,"t4":null,"t5":null,"n1":0.0,"n2":0.0,"n3":0.0,"n4":0.0,"n5":0.0}
        );
      }
    },
    err => {
      this._loading = false;
      debugger;
      console.log("Read getAllCurrency err");
    });

  }

  exportExcel() {
    let fromDate = this._util.getDDMMMYYYY(this.fromDate);
    this.loading = true;


    let requestBody = {
      date: fromDate,
      ccy: this.ccy,
      branch: this.branchCode,
      filetype:"xlsx"
    };

    this.http.downloadFile("/misreport/downloadGLTransactionReportFile", requestBody, `GL Transaction_${this.branchCode}_${fromDate}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("GL Transaction Report Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot export GL Transaction Report excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }
}
