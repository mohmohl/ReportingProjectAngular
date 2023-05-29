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
  selector: 'app-mfiu-file-download',
  templateUrl: './mfiu-file-download.component.html',
  styleUrls: ['./mfiu-file-download.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class MfiuFileDownloadComponent implements OnInit {
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
    type:new FormControl('XML', Validators.required)
  });
  constructor(private _util: CommonUtil,private fb:FormBuilder,private service: LatestTrialReportService,private mfiu_service:MFIUService) { }

  ngOnInit() {
    this.loading = true;
    this.mfiu_service.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
       this._branchList = res;
  },error => {
    this.loading = false;
    this.error ="Syatem have the error!...";
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
    this.fromDate = this._util.getDD_MM_YYYY(this.form.get(["from_date"])!.value);
    this.file_type=this.form.get(["type"])!.value
    this.loading = true;
    this.mfiu_service.get_download_file_type(this.branch_code,this.fromDate ,this.file_type)
    .pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "text/zip;charset=utf-8;" 
        });
        this.loading = false;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.file_type+'.zip';
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
