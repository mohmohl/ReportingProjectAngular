import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TwoDimensional } from 'src/models/TwoDimensional';
import { ExportDataService } from 'src/services/ExportDataService';
import { TransactionService } from 'src/services/TransactionService';
import * as XLSX from 'xlsx'; 
import * as fs from 'file-saver';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  loading = false;
  error = '';
  public data_list: TwoDimensional[]=null;
  public col_list: String[]=null;
  public startCount:number=0;
  constructor(private apiService : TransactionService,private exporter:ExportDataService) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getTransctionData().subscribe((res:TwoDimensional[])=>{
      this.loading = false;
      this.data_list = res;
      this.col_list = this.data_list[0].col;
    },(error) => {
      this.col_list=null;
      this.data_list=null;
      this.loading = false;
      this.error="Internal Server Error";
      console.log(error);
    })
  }
  exportExcel_backend(){
    console.log("excel")
    this.error='';
    this.loading = true;
    this.exporter.export_excel("/export/excel/transaction")
    .pipe(
      map((data: any) => {
      let blob = new Blob([data], {
          type: 'application/octet-stream' 
      });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "transaction.xlsx";
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
  
  exportexcel(): void 
  {
    console.log("start")
     /* table id is passed over here */   
     let element = document.getElementById('export-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     /* save to file */
     XLSX.writeFile(wb, "Transaction.xlsx");
     console.log("finish excel")
  }
  exportPDF_backend(){
    console.log("pdf")
    this.error='';
    this.loading = true;
    this.exporter.export_PDF("/export/pdf/transaction")
    .pipe(
      map((data: any) => {
      let blob = new Blob([data], {
          type: 'application/pdf'  
      });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.target = '_blank';
      link.click();
      window.URL.revokeObjectURL(link.href);
      this.loading = false;
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





