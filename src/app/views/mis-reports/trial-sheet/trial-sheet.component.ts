import { Component, OnInit } from '@angular/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { HttpService } from 'src/services/HttpService';

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
  selector: 'app-trial-sheet',
  templateUrl: './trial-sheet.component.html',
  styleUrls: ['./trial-sheet.component.css']
})
export class TrialSheetComponent implements OnInit {

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
   
    
  if(this.reportDate = new Date()){
    this.error = "Allow only Back Date";
  }else{
      let reportDate = this._util.getDDMMMYYYY(this.reportDate);
      this.loading = true;

      let requestBody = {
        t1: reportDate,
        t2: this.branchCode,
        t3: this.ccy,
        t4: 'xlsx'
      };

      this.http.downloadFile("/misreport/downloadTrialSheetFile", requestBody, `TrialSheet_${reportDate}`, 'xlsx').subscribe(
        (data: any) => {
          this.loading = false;
        },error => {
          console.log("Trial Sheet Excel Exporting Error >>> " + error)
          if (error != "") {
            this.error = "(The system cannot cannot export trial sheet excel file!.. Have the error)";
          }
          this.loading = false;
        });
      }
    }
}

