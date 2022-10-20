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
  selector: 'app-due-from-how8',
  templateUrl: './due-from-how8.component.html',
  styleUrls: ['./due-from-how8.component.css']
})
export class DueFromHOW8Component implements OnInit {
  loading;
  error;
  _loading;
  _branchList;
  branchCode: string = ''; 

  fromDate: Date;
  toDate: Date;

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();

  constructor(private http: HttpService, private _util: CommonUtil) {

  }

  ngOnInit() {

    this._loading = true;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.readReferenceData();
  }

  readReferenceData() {

    //branch list
    this.http.doGet("/misreport/getAllBranchesByUser?uname=").subscribe(resp => {
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
    let toDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let requestBody = {
      t1: fromDate,
      t2: toDate,
      t3: this.branchCode,
      t4: 'xlsx',
      t5: 'HOW8'
    };

    this.http.downloadFile("/misreport/downloadDueToHOW7File", requestBody, `Due From (HOW8)_${toDate}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("Due From (HOW8) Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot export Due From (HOW8) excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }

}
