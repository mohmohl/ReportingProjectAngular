import { Component, OnInit } from '@angular/core';
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
  selector: 'app-hod3-report',
  templateUrl: './hod3-report.component.html',
  styleUrls: ['./hod3-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})

export class Hod3ReportComponent implements OnInit {

  loading;
  error;
  _branchList;
  branchCode;
  _showData;
  _noData;
  _branchData;
  _rptTitle;
  _datalist;
  
  fromDate: Date;
  toDate: Date;
  p_toDate;

  constructor(private http: HttpService,  private _util : CommonUtil) { }

  ngOnInit() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.readReference();
  }

  readReference(){
    this.http.doGet("/misreport/getAllBranches").subscribe( resp => {
        this.loading = false;
        this._branchList = resp;
        
        if(this._branchList != null && this._branchList.length>0){
          this.branchCode = this._branchList[0].t1;
        }
        
    },
    err => {
      this.loading = false;
      debugger;
      console.log("Read getAllBranchesByUser err");
    });

  }

  showData(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode;
    this.http.doGet('/misreport/getHOD3Dataset?'+params).subscribe(res=>{
      this._showData = true;
      if(res != null){
        this.p_toDate = this.toDate;
        this._branchData = res.branchData;
        this._datalist = res.consoDataList;
      }
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Read Currency List Error >>> "+error)
      debugger;
    });

  }

  exportPDF(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode +"&filetype=.pdf";
    this.http.export_PDF("/misreport/downloadHOD3File?"+params).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/pdf"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download = "HOD3.pdf";
        document.body.appendChild(a);
        a.click();
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("HOD 3 Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate HOD 3!.. Have the error)";
            }
          this.loading = false;
        });
  }

  exportExcel(){
    let fDate = this._util.getDDMMMYYYY(this.fromDate);
    let tDate = this._util.getDDMMMYYYY(this.toDate);
    this.loading = true;

    let params = 'fromdate='+fDate+'&todate='+tDate+'&branch='+ this.branchCode +"&filetype=.xlsx";
    this.http.export_PDF("/misreport/downloadHOD3File?"+params).pipe(
      map((data: any) => {
        
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel"
        });
        var a = document.createElement("a");
        var file = new Blob([data], {type: 'application/vnd.ms-excel'});
        var fileURL = URL.createObjectURL(file);
        a.href = fileURL;
        a.target     = '_blank'; 
        a.download = "HOD3.xlsx";
        document.body.appendChild(a);
        a.click();
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log(" HOD 3 Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = "(The system cannot cannot generate HOD 3!.. Have the error)";
            }
          this.loading = false;
        });
  }

}
