import { Component, OnInit } from '@angular/core';
import { ExportDataService } from 'src/services/ExportDataService';
import { map } from 'rxjs/operators';
import { FinanceReportService } from 'src/services/FinanceReportService';
import { LoanProductExcelData } from 'src/models/LoanProductExcelData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { NativeDateAdapter,MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common'

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
  selector: 'app-loanproduct-excel',
  templateUrl: './loanproduct-excel.component.html',
  styleUrls: ['./loanproduct-excel.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class LoanproductExcelComponent implements OnInit {

  minDate = new Date(2021, 5, 30);
  maxDate = new Date();
  
  error = '';
  loading = false;

  public startCount:number=0;

  dataList: LoanProductExcelData[];
  branch_list : string[];
  ccy_list : string[];

  branch = '';
  fromdate : Date;
  ccy = '';

  form = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
    ccy: new FormControl('', Validators.required)
  });

 constructor(private xlsService : FinanceReportService, private exportServ : ExportDataService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.loading = true;
    this.xlsService.getBranchList().subscribe(res =>{
      this.loading = false
      this.branch_list=res;
    });

    this.xlsService.getCurrencyList().subscribe(res =>{
      this.loading = false
      this.ccy_list=res;
    });
    /*
    this.xlsService.getLoanExcelData(this.branch, this.ccy).subscribe((res:LoanProductExcelData[])=>{
      this.dataList = res;
      this.loading = false;
    },
    (error)=>{
      this.error = 'Internal Server Error';
      this.loading = false;
    
    });*/
  }

  exportExcel_backend(){


    this.branch = this.form.get(["branch"])!.value;
    this.ccy = this.form.get(["ccy"])!.value;
    this.fromdate = this.form.get(["fromDate"])!.value;
    let f_Date = `${this.fromdate.getFullYear()}-${this.fromdate.getMonth()+1}-${this.fromdate.getDate()}`;
    let date = this.datepipe.transform(this.fromdate, 'yyyyMMdd');
    console.log('exporting excel...');
    this.error='';
    this.loading = true;

    this.exportServ.export_excel("/export/excel/xlsloanall?branch="+this.branch+"&ccy="+this.ccy+"&fdate="+date)
    .pipe(
      map((data: any) => {
      let blob = new Blob([data], {
          type: 'application/octet-stream' 
      });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "Loan Account Data.xlsx";
      link.click();
      console.log("Finish >>>")
    }))
    .subscribe((res)=>{
      this.loading = false;
    },(error) => {
      this.loading = false;
      this.error="Cannot export excel (Internal Server Error)";
      console.log(error);
    })
    
  }


}
