import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { map } from 'rxjs/operators';
import { CommonUtil } from 'src/app/shared/common-util';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { MFIUService } from 'src/services/MFIUService';
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
  selector: 'app-mfiu-data-checking',
  templateUrl: './mfiu-data-checking.component.html',
  styleUrls: ['./mfiu-data-checking.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class MfiuDataCheckingComponent implements OnInit {

  error='';
  message='';
  loading = false;
  branch_code='';
  fromDate='';
  file_type='';
  toDate='';
  search_btn_flag=false;
  _branchList;
  ho_role_flag=false;
  form = this.fb.group({
    branch_code:new FormControl('', Validators.required),
    from_date:new FormControl('', Validators.required),
    to_date:new FormControl('', Validators.required),
    type:new FormControl('Original', Validators.required)
  });
  constructor(private _util: CommonUtil,private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService) { }

  ngOnInit() {
    this.loading = true;
        this.service.getBranchList(1).subscribe((res:string[])=>{
            this.loading = false;
             this._branchList = res;
        });
        this.mfiu_service.checking_role().subscribe((res:boolean)=>{
          this.loading = false;
           this.ho_role_flag = res;
      });
  }
  submit(){
    this.error ='';
    this.message='';
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    this.branch_code=this.form.get(["branch_code"])!.value;
    this.fromDate = this._util.getDDMMMYYYY(this.form.get(["from_date"])!.value);
    this.toDate = this._util.getDDMMMYYYY(this.form.get(["to_date"])!.value);
    this.file_type=this.form.get(["type"])!.value
    this.loading = true;
    this.mfiu_service.get_download_checking(this.branch_code,this.fromDate,this.toDate ,this.file_type)
    .pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel;charset=utf-8;" 
        });
        this.loading = false;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.file_type+'.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
        this.loading = false;
        this.error ='';
      
      })).subscribe(
        res => { },
        error => {
          this.error =  "(The system cannot find the file specified)";
          this.loading = false;
        });
  }

}
