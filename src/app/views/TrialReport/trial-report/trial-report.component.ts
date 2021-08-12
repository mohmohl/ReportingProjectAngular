import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrialReport } from 'src/models/TrialReport';
import { DateAdapter} from '@angular/material/core';
import { TrialReportService } from 'src/services/TrialReportService';
import { TrialData } from 'src/models/TrialData';
@Component({
  selector: 'app-trial-report',
  templateUrl: './trial-report.component.html',
  styleUrls: ['./trial-report.component.css']
})
export class TrialReportComponent implements OnInit {
  error='';
  from_date:Date;
  loading = false;
  data:TrialReport;
  trialList:TrialData[];
  branchList:string[];
  currencyList:string[];
  currencyCode='MMK';
  ccyCode = false;
  data_message='';
  form = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    branchCode:new FormControl('', Validators.required),
    currencyCode:new FormControl('', Validators.required)
  });
  constructor(private service:TrialReportService,private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.loading = true;
    service.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    this.loading = true;
    service.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      this.currencyList = res;
    });
   }

  ngOnInit() {
  }
  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.from_date = this.form.get(["fromDate"])!.value;
  this.loading = true;

  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  let bCode=this.form.get(["branchCode"])!.value;
  this.currencyCode = this.form.get(["currencyCode"])!.value;
  
  if(this.currencyCode == "Base" || this.currencyCode == "MMK"){
    this.ccyCode = false;
  }
  else{
    this.ccyCode = true;
  }
  this.service.getTrialReportData(fDate,bCode,this.currencyCode).subscribe((res:TrialReport)=>{
    this.loading = false;
   
    if(res != null){
      this.data_message="";
      this.data = res;
      this.trialList = this.data.trialList;
    }
    else{
      this.data_message="No Record Found";
    }
    if(this.trialList == null){
      this.data_message="No Record Found";
    }
  },(error) => {
    this.data=null;
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
}
}
