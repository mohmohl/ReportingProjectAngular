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
  selector: 'app-financial-position',
  templateUrl: './financial-position.component.html',
  styleUrls: ['./financial-position.component.css']
})
export class FinancialPositionComponent implements OnInit {

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
  branchCode: string = '';

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
  }

  exportExcel() {
    let fromDate = this._util.getDDMMMYYYY(this.fromDate);
    this.loading = true;


    let requestBody = {
      t1: fromDate,
      t2: this.branchCode,
      filetype:"xlsx"
    };

    this.http.downloadFile("/misreport/downloadHOM7ReportFile", requestBody, `financial-position_${this.branchCode}_${fromDate}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("Financial Position Report Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot export Financial Position Report excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }
}
