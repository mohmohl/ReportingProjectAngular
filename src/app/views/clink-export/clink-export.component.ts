import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CLinkData } from 'src/models/CLinkData';
import { CLinkReportService } from 'src/services/CLinkReportService';
import { TwoDimensional } from 'src/models/TwoDimensional';

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
  selector: 'app-clink-export',
  templateUrl: './clink-export.component.html',
  styleUrls: ['./clink-export.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
],
encapsulation: ViewEncapsulation.None
})
export class ClinkExportComponent implements OnInit {

  error='';
  msg='';
  loading = false;
  
  indexFlag: Boolean = false;
  list: Array<TwoDimensional> = [];
  maxCount = 5000;
  numberOfThreads = 0;
  module;
  disabled = true;

  form = new FormGroup({
     fromDate: new FormControl(new Date(), Validators.required),
     toDate: new FormControl(new Date(), Validators.required),
     reportType: new FormControl('domestic_company', Validators.required)
  }); 

  constructor(private service: CLinkReportService, public datepipe: DatePipe) { }

  ngOnInit() { }

  dataPreparation() {
    this.error="";
    this.msg = "";
    if (this.form.invalid ) {
      this.error = "Data is required";
      return;
    }

    this.loading = true; 

    let fromDate = this.form.get(["fromDate"])!.value
    let fDate = `${fromDate.getDate()}-${fromDate.getMonth()+1}-${fromDate.getFullYear()}`;
   
    let toDate = this.form.get(["toDate"])!.value
    let tDate = `${toDate.getDate()}-${toDate.getMonth()+1}-${toDate.getFullYear()}`;
    
    const data = new CLinkData();
    data.fromDate = fDate;
    data.toDate = tDate;
    data.reportType = this.form.get(["reportType"])!.value;
    
    this.service.dataPreparation(data).subscribe(res =>{
      this.loading = false;
      if(res){
        this.msg = "Preparation Successful!..."
        this.disabled = false;
      }
      else{
        this.error="Preparation Fail"
      }
    },
    error => {
      this.error = "(The system have the error!)";
      this.loading = false; 
    });

  }

  check() {
    var reportType = this.form.get(["reportType"])!.value
    var fileName = "";
    if(reportType === "domestic_company") {
			fileName += "Domestic_Company_";
		} else if(reportType === "domestic_individual") {
			fileName += "Domestic_Individual_";
		} else if(reportType === "foreign_individual") {
			fileName += "Foreign_Individual_";
		}

    this.service.getTotalRecords(this.form.get(["reportType"])!.value).subscribe(res =>{
      this.loading = false;
      if(res == 0 || res < this.maxCount){
        this.export(0,0,fileName,0);
      }
      else{
        this.separateCSV(res,fileName);
      }
    });
  }

  separateCSV(totalRecords: number,fileName: string) {
    this.module = totalRecords % this.maxCount;  
      
    if (this.module > 0) {
      this.numberOfThreads = Math.floor(totalRecords/this.maxCount) + 1;
      this.indexFlag = true;
    } else if (this.module < 0) {
      this.numberOfThreads = 1;
      this.indexFlag = true;
    } else if (this.module == 0) {
      this.numberOfThreads = Math.floor(totalRecords/this.maxCount);
      this.indexFlag = false;
    }
      
    var start = 1;
    var end = 0;
    for (let i = 1; i <= this.numberOfThreads; i++) {
      end = this.maxCount * i;
      if (i == this.numberOfThreads) {
        if (this.indexFlag) {
          end = totalRecords; 
        }
      }

      // wanna to separate csv file depends on record counts
      this.export(start,end,fileName,i);
      start = end+1;
    }
  }

  submit() {
    debugger
    this.error="";
    this.msg = "";
    if (this.form.invalid ) {
      this.error = "Data is required";
      return;
    }

    this.loading = true; 
    this.check();
  }

  export(start: number, end: number,fileName: string,serial: number) {
    let fromDate = this.form.get(["fromDate"])!.value
    let fDate = `${fromDate.getDate()}-${fromDate.getMonth()+1}-${fromDate.getFullYear()}`;
   
    let toDate = this.form.get(["toDate"])!.value
    let tDate = `${toDate.getDate()}-${toDate.getMonth()+1}-${toDate.getFullYear()}`;

    let subFileName = `${toDate.getFullYear()}${toDate.getMonth()+1}${toDate.getDate()}`;
    //console.log("Sub File Name: " + subFileName);

    const data = new CLinkData();
    data.fromDate = fDate;
    data.toDate = tDate;
    data.reportType = this.form.get(["reportType"])!.value;
    data.start = start;
    data.end = end;
   
    this.service.exportExcel(data).pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "text/csv;charset=utf-8;" 
        });

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        if(serial === 0) {
          link.download = fileName + subFileName +'.csv';
        } else {
          link.download = fileName + subFileName + '_' +serial +'.csv';
        }

        link.click();
        window.URL.revokeObjectURL(link.href);

        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("CLink_Data_Export_Report Error >>> "+error)
          if(error != ""){
          this.error = "(The system cannot generate CLink_Data_Export Report!.. Have the error)";
            }
          this.loading = false;
        });
  }

}