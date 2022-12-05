import { Component, OnInit } from '@angular/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { HttpService } from 'src/services/HttpService';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.css']
})
export class LoanSummaryComponent implements OnInit {
  
  loading;
  error;
  fromDate: Date;
  _branchList = [{"code":"ALL", "desc":"ALL"}];
  branchCode: string = '';

  constructor(private http: HttpService, private _util: CommonUtil) { }

  ngOnInit() {
    this.getBranchList();
    this.branchCode = 'ALL';
  }

  getBranchList(){
    this._branchList.push({"code":"MABMM891", "desc":"Regional Zone(1)"});
    this._branchList.push({"code":"MABMM892", "desc":"Regional Zone(2)"});
    this._branchList.push({"code":"MABMM898", "desc":"Regional Zone(3)"});
    this._branchList.push({"code":"MABMM894", "desc":"Regional Zone(4)"});
    this._branchList.push({"code":"MABMM895", "desc":"Regional Zone(5)"});
    this._branchList.push({"code":"MABMM896", "desc":"Regional Zone(6)"});
    this._branchList.push({"code":"MABMM897", "desc":"Regional Zone(7)"});
    this._branchList.push({"code":"MABMM893", "desc":"Regional Zone(8)"});
    this._branchList.push({"code":"MABMM899", "desc":"Regional Zone(9)"});
    this._branchList.push({"code":"MABMM993", "desc":"Treasury Department"});
    this._branchList.push({"code":"MABMM996", "desc":"Foreign Banking TPU"});
    this._branchList.push({"code":"MABMM997", "desc":"Card Center (ATM)"});   
    this._branchList.push({"code":"MABMM998", "desc":"Corporate Banking Branch"});
    this._branchList.push({"code":"MABMM999", "desc":"Control Office HO"});
  }

  exportExcel() {
    let reportDate = this._util.getDDMMMYYYY(this.fromDate);
    this.loading = true;


    let requestBody = {
      branch: this.branchCode ,
      date: reportDate,
      filetype: 'xlsx',
      t1:"1"
    };

    this.http.downloadFile("/misreport/downloadLoanSummaryReportFile", requestBody, `LoanSummary_${this.branchCode}_${reportDate}`, 'xlsx').subscribe(
      (data: any) => {
        this.loading = false;
      },error => {
        console.log("Loan Summary Excel Exporting Error >>> " + error)
        if (error != "") {
          this.error = "(The system cannot cannot export Loan Summary excel file!.. Have the error)";
        }
        this.loading = false;
      });

  }

}
