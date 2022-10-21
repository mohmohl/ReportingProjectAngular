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
  selector: 'app-cashinhand-hod9',
  templateUrl: './cashinhand-hod9.component.html',
  styleUrls: ['./cashinhand-hod9.component.css']
})
export class HOD9Component implements OnInit {
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
  _divby;
  divby;
  _printCcyTypeList;
  _printByList;
  branchCode: string = '';

  fromDate: Date;
  toDate: Date;

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();

  constructor(private http: HttpService, private _util: CommonUtil) {

  }

  ngOnInit() {

    this._uname = '';
    this._loading = true;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.readReferenceData();
  }

  readReferenceData() {

    this._divby = ["1", "1000", "10000", "100000", "1000000"];
    this.divby="1";

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

  
  }

  exportExcel() {
   
    let fromDate = this._util.getDDMMMYYYY(this.fromDate);
    this.loading = true;

    let requestBody = {
      t1: fromDate,
      t2: this.branchCode,
      t3: this.divby,
      t4: 'xlsx'
    };

    this.http.downloadFile("/misreport/downloadHOD9File", requestBody, `Cash In Hand Position as All Branches(HOD9)_${fromDate}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("HOD9 Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot export HOD9 excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }

}