import { Component, OnInit } from '@angular/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { HttpService } from 'src/services/HttpService';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter } from 'src/models/PickDateAdapter';

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
  selector: 'app-bank-cash',
  templateUrl: './bank-cash.component.html',
  styleUrls: ['./bank-cash.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class BankCashComponent implements OnInit {

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
  branchCode: string = '';
  ccy;
  type;
  printby;

  reportDate: Date;

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();

  constructor(private http: HttpService, private _util: CommonUtil) {

  }

  ngOnInit() {

    this._uname = '';
    this._loading = true;
    this.reportDate = new Date();
    this.readReferenceData();
  }

  readReferenceData() {

    //branch list
    this.http.doGet("/misreport/getAllBranchesByUser?uname=" + this._uname).subscribe(resp => {
      this._loading = false;
      this._branchList = resp;
      if (this._branchList != null && this._branchList.length > 0) {
        this.branchCode = this._branchList[0].code;
      }
    },
      err => {
        this._loading = false;
        console.log("Read getAllBranchesByUser err");
      });

    //ccy list
    this.http.doGet("/misreport/getAllCurrency").subscribe(resp => {
      this._loading = false;
      this._ccyList = resp;
      if (this._ccyList != null && this._ccyList.length > 0) {
        this.ccy = this._ccyList[0].t1;
      }
    },
      err => {
        this._loading = false;
        console.log("Read getAllCurrency err");
      });
  }

  exportExcel() {

    
   
      let reportDate = this._util.getDDMMMYYYY(this.reportDate);
      this.loading = true;

      let requestBody = {
        reportDate: reportDate,
        branchCode: this.branchCode,
        ccy: this.ccy,
        fileType: 'xlsx'
      };

      this.http.downloadFile("/misreport/downloadBankCashScrollFile", requestBody, `BankCashScroll_${reportDate}`, 'xlsx').subscribe(
        (data: any) => {
          this.loading = false;
        },error => {
          console.log("Bank Cash Scroll Excel Exporting Error >>> " + error)
          if (error != "") {
            this.error = "(The system cannot cannot export bank cash scroll excel file!.. Have the error)";
          }
          this.loading = false;
        });
      }

}
