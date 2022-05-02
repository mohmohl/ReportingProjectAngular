import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TwoDimensional } from 'src/models/TwoDimensional';
import { ExportDataService } from 'src/services/ExportDataService';
import { FinanceReportService } from 'src/services/FinanceReportService';

@Component({
  selector: 'app-hod2-report',
  templateUrl: './hod2-report.component.html',
  styleUrls: ['./hod2-report.component.css']
})
export class Hod2ReportComponent implements OnInit {

  error = '';
  loading = false;

  public col_list : String[] = null;
  public data_list : TwoDimensional[]=null;
  public startCount:number=0;
  

  constructor(private rptService : FinanceReportService, private exportServ : ExportDataService) { }

  ngOnInit(): void {
    this.loading = true;
    this.rptService.getHOD2ReportData().subscribe((res:TwoDimensional[])=>{
      this.loading = false;
      this.data_list = res;
      this.col_list = this.data_list[0].col;
    },
    (error)=>{
      this.error = 'Internal Server Error';
      this.loading = false;
    
      this.col_list = null;
      this.data_list =null;
    });
  }

  exportExcel_backend(){

    console.log('exporting excel...');
    this.error='';
    this.loading = true;

    this.exportServ.export_excel("/export/excel/rpthod2")
    .pipe(
      map((data: any) => {
      let blob = new Blob([data], {
          type: 'application/octet-stream' 
      });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "HOD2.xlsx";
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

  exportPDF_backend(){
    console.log("pdf")
    this.error='';
    this.loading = true;
    this.exportServ.export_PDF("/export/pdf/rpthod2")
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
