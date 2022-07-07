import { Component, OnInit } from '@angular/core';
import { DateAdapter} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { MAT_DATE_FORMATS } from '@angular/material';
import { TrialReportService } from 'src/services/TrialReportService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BSUserReportService } from 'src/services/BSUserReportService';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

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
  selector: 'app-bs-user-report',
  templateUrl: './bs-user-report.component.html',
  styleUrls: ['./bs-user-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})

export class BsUserReportComponent implements OnInit {
  error='';
  msg='';
  loading = false;
  branchList:string[];

  form = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    branch: new FormControl('', Validators.required)
  }); 

  constructor(private service:TrialReportService, private bsService: BSUserReportService, public datepipe: DatePipe) { 

    this.loading = true;
    service.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
  }

  ngOnInit() { }

  submit() {
    this.error="";
    this.msg = "";
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }

    let fromDate = this.form.get(["date"])!.value
    let branch = this.form.get(["branch"])!.value

    let fDate = `${fromDate.getFullYear()}-${fromDate.getMonth()+1}-${fromDate.getDate()}`;

    this.loading = true; 
    this.bsService.exportExcel(fDate, branch).pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel" 
        });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'FCUB_UserReport_' + this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') +'.xlsx';
          link.click();
          window.URL.revokeObjectURL(link.href);
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("FCUB_UserReport Error >>> "+error)
          if(error != ""){
          this.error = "(The system cannot generate FCUB_User Report!.. Have the error)";
            }
          this.loading = false;
        });
  }

}
