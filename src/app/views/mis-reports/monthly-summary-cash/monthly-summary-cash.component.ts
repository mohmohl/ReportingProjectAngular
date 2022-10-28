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
  selector: 'app-monthly-summary-cash',
  templateUrl: './monthly-summary-cash.component.html',
  styleUrls: ['./monthly-summary-cash.component.css']
})
export class MonthlySummaryCashComponent implements OnInit {

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
  toDate: Date;

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();

  constructor(private latestTriService: LatestTrialReportService, private http: HttpService, private _util: CommonUtil) {

  }

  ngOnInit() {

    this._uname = '';
    this._loading = true;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.readReferenceData();
  }

  readReferenceData() {

    this.loading = true;
    this.latestTriService.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      this._ccyList = res;
      this.ccy = "Base";
    });

    this.latestTriService.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
     this._branchList = res;
     this._branchList.push("ALL");
     this.branchCode = "ALL";
    });
  }

  exportExcel() {
    let fromDate = this._util.getDDMMMYYYY(this.fromDate);
    let toDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;


    let requestBody = {
      t1: fromDate,
      t2: toDate,
      t3: this.branchCode,
      t4: this.ccy,
      t5:"xlsx"
    };

    this.http.downloadFile("/misreport/downloadMonthlySummaryCashFile", requestBody, `Monthly Summary Cash Transaction_${this.branchCode}_${this.ccy}_${toDate}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("Monthly Summary Cash Transaction Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot export HOD9 excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }
}
