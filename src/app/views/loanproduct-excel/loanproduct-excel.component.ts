import { Component, OnInit } from '@angular/core';
import { ExportDataService } from 'src/services/ExportDataService';
import { map } from 'rxjs/operators';
import { FinanceReportService } from 'src/services/FinanceReportService';
import { LoanProductExcelData } from 'src/models/LoanProductExcelData';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loanproduct-excel',
  templateUrl: './loanproduct-excel.component.html',
  styleUrls: ['./loanproduct-excel.component.css']
})
export class LoanproductExcelComponent implements OnInit {

  error = '';
  loading = false;

  public startCount:number=0;

  dataList: LoanProductExcelData[];
  branch_list : string[];
  ccy_list : string[];

  branch = '';
  ccy = '';

  form = new FormGroup({
    branch: new FormControl(''),
    ccy: new FormControl('')
  });

 constructor(private xlsService : FinanceReportService, private exportServ : ExportDataService) { }

  ngOnInit(): void {
    this.loading = false;
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
    console.log('exporting excel...');
    this.error='';
    this.loading = true;

    this.exportServ.export_excel("/export/excel/xlsloanall?branch="+this.branch+"&ccy="+this.ccy)
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
