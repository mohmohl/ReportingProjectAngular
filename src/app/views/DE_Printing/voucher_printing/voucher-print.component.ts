import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CommonModel } from 'src/models/CommonModel';
import { BackDateReportService } from 'src/services/BackDateReportService';
import { CommomBranchService } from 'src/services/CommonBranchServcie';

@Component({
  selector: 'app-migration-report',
  templateUrl: './voucher-print.component.html',
  styleUrls: ['./voucher-print.component.css']
})
export class VoucherPrintComponent implements OnInit {

  branch_list:string[];
  report_list:CommonModel[]=[];
  file:CommonModel=new CommonModel();
  loading = false;
  branch: string;
  fileName: string;
  version:string;
  error = '';
  form = new FormGroup({
    branch: new FormControl('',Validators.required)
  });

  constructor(private bdService:BackDateReportService,private b_service:CommomBranchService) { 
  
  }

  ngOnInit() {
    
    this.loading = true
    this.b_service.get_home_branch().subscribe(res =>{
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
    this.error = "";
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    this.branch = this.form.get(["branch"])!.value;

    this.loading = true;
    this.bdService.export_tt_print(this.branch)
    .pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "application/pdf"
        });

            var a = document.createElement("a");
            document.body.appendChild(a);
            var file = new Blob([data], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            a.href = fileURL;
            a.target     = '_blank'; 
            a.click();

         
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log(" Error >>> "+error)
          debugger;
          if(error != ""){
          this.error = this.branch + "(No record found)";
            }
          this.loading = false;
        });

  }

}
