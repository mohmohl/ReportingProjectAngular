import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FCDBAndFCUBSService } from 'src/services/FCDB_FCUBS_Service';
import { TrialReportService } from 'src/services/TrialReportService';

@Component({
  selector: 'app-cust-fcdb-fcubs',
  templateUrl: './cust-fcdb-fcubs.component.html',
  styleUrls: ['./cust-fcdb-fcubs.component.css']
})
export class CustFcdbFcubsComponent implements OnInit {
  error='';
  loading = false;
  branchList:string[];
  bCode:string;
  form = new FormGroup({
    branchCode:new FormControl('', Validators.required)
  });

  constructor(private service:FCDBAndFCUBSService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
  }
  exportExcel(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.bCode=this.form.get(["branchCode"])!.value;
  this.loading = true;
  this.service.export_fcub_fcdb_Excel(this.bCode)
  .pipe(
    map((data: any) => {
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'CustInfo_FCUB_FCDB.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        this.error = "(The system cannot cannot generate detail trial!.. Have the error)";
        this.loading = false;
      });
  }
}
