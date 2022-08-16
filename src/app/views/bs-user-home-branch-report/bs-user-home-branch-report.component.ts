import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BSUserReportService } from 'src/services/BSUserReportService';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MultiBranch } from 'src/models/MultiBranch';

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
  selector: 'app-bs-user-home-branch-report',
  templateUrl: './bs-user-home-branch-report.component.html',
  styleUrls: ['./bs-user-home-branch-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
],
})

export class BsUserHomeBranchReportComponent implements OnInit {
  error='';
  msg='';
  loading = false;
  branchList:string[];
  
  form = new FormGroup({
    branch: new FormControl('', Validators.required),
    homeBranch: new FormControl('yes', Validators.required),
    role: new FormControl('yes', Validators.required)
  }); 

  constructor(private bsService: BSUserReportService, public datepipe: DatePipe) { 

    this.loading = true;
    bsService.getHomeBranchList().subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
  }

  ngOnInit() { }

  submit() {
  debugger
  this.error="";
  this.msg = "";
  if (this.form.invalid) {
    this.error = "Data is required";
    return;
  }

  this.loading = true; 

  const branchData = new MultiBranch();
  branchData.role = this.form.get(["role"])!.value;
  branchData.branchCode = this.form.get(["branch"])!.value;
  branchData.homeBranch = this.form.get(["homeBranch"])!.value;

this.bsService.exportHomeBranchExcel(branchData).pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel" 
        });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Active_UserReport_' + this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') +'.xlsx';
          link.click();
          window.URL.revokeObjectURL(link.href);
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("Active_UserReport Error >>> "+error)
          if(error != ""){
          this.error = "(The system cannot generate Active_User Report!.. Have the error)";
            }
          this.loading = false;
        });
  }

}
