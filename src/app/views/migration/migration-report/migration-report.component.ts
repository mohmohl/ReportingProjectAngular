import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BackDateReportService } from 'src/services/BackDateReportService';

@Component({
  selector: 'app-migration-report',
  templateUrl: './migration-report.component.html',
  styleUrls: ['./migration-report.component.css']
})
export class MigrationReportComponent implements OnInit {

  branch_list:string[];
  report_list:string[]=[];
  loading = false;
  branch: string;
  fileName: string;
  version:string;
  error = '';

  form = new FormGroup({
    branch: new FormControl('',Validators.required),
    version:new FormControl('V12',Validators.required),
    report_name:new FormControl('',Validators.required)
  });

  constructor(private bdService:BackDateReportService) { 
  
  }

  ngOnInit() {
    this.set_report_name();
    this.loading = true
    this.bdService.getBranchListForMigration().subscribe(res =>{
      this.loading = false
      this.branch_list=res;
    },error=>{
      this.loading = false
      this.error="System have the error!..."
    });

  }

  submit() {
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    this.loading = true;
    this.error = "";
    this.branch = this.form.get(["branch"])!.value;
    this.fileName=this.form.get(["report_name"])!.value;
    this.version=this.form.get(["version"])!.value;
    
    this.bdService.exportMigration_report(this.fileName,this.branch,this.version).pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "text/csv;charset=utf-8;" 
        });

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = this.fileName+'.csv';
        link.click();
        window.URL.revokeObjectURL(link.href);

        this.loading = false;
      })).subscribe(
        res => { },
          error => {
            this.error =  "Branch Code - " + this.branch + " /File Name - " + this.fileName  + "(The system cannot find the file specified)";
            this.loading = false;
          });



  }
set_report_name(){
  this.loading = true
    this.bdService.getReportListForMigration().subscribe(res =>{
      this.loading = false
      this.report_list=res;
    },error=>{
      this.loading = false
      this.error="System have the error!..."
    });
}
}
