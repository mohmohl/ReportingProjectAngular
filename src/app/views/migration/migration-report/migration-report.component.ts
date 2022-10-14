import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CommonModel } from 'src/models/CommonModel';
import { BackDateReportService } from 'src/services/BackDateReportService';

@Component({
  selector: 'app-migration-report',
  templateUrl: './migration-report.component.html',
  styleUrls: ['./migration-report.component.css']
})
export class MigrationReportComponent implements OnInit {

  branch_list:string[];
  report_list:CommonModel[]=[];
  file:CommonModel=new CommonModel();
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
  onSelected(value:string): void {
		alert(value);
	}
  submit() {
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
   
    this.error = "";
    this.branch = this.form.get(["branch"])!.value;
    this.fileName=this.form.get(["report_name"])!.value;
    let file_name= this.fileName;
    this.version=this.form.get(["version"])!.value;
    let nameObj:CommonModel[] =  this.report_list.filter(function(e) {
      return e.report_name == file_name;
    });
    
    this.loading = true;
    this.bdService.exportMigration_report(this.fileName,this.branch,this.version).pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "text/csv;charset=utf-8;" 
        });

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = nameObj[0].report_no+"-"+nameObj[0].report_name+"_"+this.version+"_"+this.branch+'.csv';
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
    this.bdService.getReportListForMigration().subscribe((res:CommonModel[]) =>{
      this.loading = false
      this.report_list=res;

    },error=>{
      this.loading = false
      this.error="System have the error!..."
    });
}
}
