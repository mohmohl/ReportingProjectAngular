import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrialReport } from 'src/models/TrialReport';
import { DateAdapter} from '@angular/material/core';
import { TrialReportService } from 'src/services/TrialReportService';
import { TrialData } from 'src/models/TrialData';
import { MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { formatNumber } from '@angular/common';
import { map } from 'rxjs/operators';

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
  selector: 'app-general-trial-report',
  templateUrl: './general-trial-report.component.html',
  styleUrls: ['./general-trial-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})

export class GeneralTrialReportComponent implements OnInit {
  error='';
  from_date:Date;
  loading = false;
  data:TrialReport;
  bCode:string;
  minDate = new Date(2021, 5, 30);
  maxDate = new Date();
    //for period
    totalasset_debit:number=0;
    totalasset_credit:number=0;
    totalliab_debit:number=0;
    totalliab_credit:number=0;
    totalincome_debit:number=0;
    totalincome_credit:number=0;
    totalexp_debit:number=0;
    totalexp_credit:number=0;
    totalasset_debitstr:string;
    totalasset_creditstr:string;
    totalliab_debitstr:string;
    totalliab_creditstr:string;
    totalincome_debitstr:string;
    totalincome_creditstr:string;
    totalexp_debitstr:string;
    totalexp_creditstr:string;
    miantotalDebit:number=0;
    miantotalCredit:number=0;
    miantotalDebitstr:string;
    miantotalCreditstr:string;
totalDebit:number=0;
totalDebit_lcy:number=0;
totalCredit:number=0;
totalCredit_lcy:number=0;
totalDebitstr:string;
totalDebit_lcystr:string;
totalCreditstr:string;
totalCredit_lcystr:string;
  trialList:TrialData[];
  branchList:string[];
  yearList:string[];
  periodList:string[];
  currencyList:string[];
  currencyCode='MMK';
  ccyCode = false;
  data_message='';
  filter1:Boolean=true;
  form = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    branchCode:new FormControl('', Validators.required),
    currencyCode:new FormControl('MMK', Validators.required)
  });
  form2 = new FormGroup({
    finYear: new FormControl('', Validators.required),
    branchCode:new FormControl('', Validators.required),
    periodCode:new FormControl('', Validators.required)
  });
  constructor(private service:TrialReportService){//,private dateAdapter: DateAdapter<Date>) {
    //this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.loading = true;
    service.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    this.loading = true;
    service.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      this.currencyList = res;
    });
    this.loading = true;
    service.get_finance_cycle_List().subscribe((res:string[])=>{
      this.loading = false;
      this.yearList = res;
    });
   }

  ngOnInit() {
  }
  isNegitive(val: number): boolean {
    if (val < 0) {
     return true;
    } else {
     return false
    }
   }
   
  submit(){
    this.error="";
    this.amount_clear();
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
 
  this.from_date = this.form.get(["fromDate"])!.value;
  this.loading = true;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  this.bCode=this.form.get(["branchCode"])!.value;
  this.currencyCode = this.form.get(["currencyCode"])!.value;
  
  if(this.currencyCode == "Base" || this.currencyCode == "MMK"){
    this.ccyCode = false;
  }
  else{
    this.ccyCode = true;
  }
  this.bCode=this.form.get(["branchCode"])!.value;

  this.service.getGeneralTrialReportData(fDate,this.bCode,this.currencyCode, 1).subscribe((res:TrialReport)=>{
    this.loading = false;
   
    if(res != null){
      this.data_message="";
      this.data = res;
      this.trialList = this.data.trialList;
      this.findsum(this.trialList);
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
    
  });
}
amount_clear(){
  this.trialList=null;
  this.totalDebit=0;
  this.totalDebit_lcy=0;
  this.totalCredit=0;
  this.totalCredit_lcy=0;
  this.totalasset_debit=0;
  this.totalasset_credit=0;
  this.totalliab_debit=0;
  this.totalliab_credit=0;
  this.totalincome_debit=0;
  this.totalincome_credit=0;
  this.totalexp_debit=0;
  this.totalexp_credit=0;
  this.miantotalDebit=0;
  this.miantotalCredit=0;
}
periodSubmit(){
  this.error ="";

  this.amount_clear();
  if (this.form2.invalid) {
    this.error = "Data is required";
    return;
}

let year = this.form2.get(["finYear"])!.value;
this.bCode=this.form2.get(["branchCode"])!.value;
this.currencyCode = this.form2.get(["periodCode"])!.value;


  this.ccyCode = false;


this.loading = true;
this.service.getTrialReportData(year,this.bCode,this.currencyCode, 3).subscribe((res:TrialReport)=>{
  this.loading = false;
 
  if(res != null){
    this.data_message="";
    this.data = res;
    this.trialList = this.data.trialList;
    this.findsum(this.trialList);
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
  
});
}
findsum(data:TrialData[]){    
 
  for(let j=0;j<data.length;j++){  
    if(data[j].debit < 0 ){
      data[j].debitstr = this.isNegitiveTransform(data[j].debit)
    }
    if(data[j].debit_lcy < 0 ){
      data[j].debit_lcystr = this.isNegitiveTransform(data[j].debit_lcy)
      console.log(">>> "+data[j].debit_lcystr)
    }
    if(data[j].credit < 0 ){data[j].creditstr = this.isNegitiveTransform(data[j].credit)}
    if(data[j].credit_lcy < 0 ){data[j].credit_lcystr = this.isNegitiveTransform(data[j].credit_lcy)} 
      
      this.totalDebit+= data[j].debit;
       this.totalDebit_lcy+= data[j].debit_lcy;
       this.totalCredit+= data[j].credit;
       this.totalCredit_lcy+= data[j].credit_lcy;
       this.totalasset_debit += data[j].asset_debit;
       this.totalasset_credit+= data[j].asset_credit;
       this.totalliab_debit+= data[j].liab_debit;
       this.totalliab_credit+= data[j].liab_credit;
       this.totalincome_debit+= data[j].income_debit;
       this.totalincome_credit+= data[j].income_credit;
       this.totalexp_debit+= data[j].exp_debit;
       this.totalexp_credit+= data[j].exp_credit;
  }
  this.miantotalDebit=this.totalasset_debit+this.totalliab_debit+ this.totalincome_debit+this.totalexp_debit;
  this.miantotalCredit=this.totalasset_credit+this.totalliab_credit+ this.totalincome_credit+this.totalexp_credit;

if(this.totalDebit < 0 )this.totalDebitstr = this.isNegitiveTransform(this.totalDebit);
if(this.totalDebit_lcy < 0 )this.totalDebit_lcystr = this.isNegitiveTransform(this.totalDebit_lcy);
if(this.totalCredit < 0 )this.totalCreditstr = this.isNegitiveTransform(this.totalCredit);
if(this.totalCredit_lcy < 0 )this.totalCredit_lcystr = this.isNegitiveTransform(this.totalCredit_lcy);
//for period
if(this.totalasset_debit < 0 )this.totalasset_debitstr = this.isNegitiveTransform(this.totalasset_debit);
if(this.totalasset_credit < 0 )this.totalasset_creditstr = this.isNegitiveTransform(this.totalasset_credit);
if(this.totalliab_debit < 0 )this.totalliab_debitstr = this.isNegitiveTransform(this.totalliab_debit);
if(this.totalliab_credit < 0 )this.totalliab_creditstr = this.isNegitiveTransform(this.totalliab_credit);
if(this.totalincome_debit < 0 )this.totalincome_debitstr = this.isNegitiveTransform(this.totalincome_debit);
if(this.totalincome_credit < 0 )this.totalincome_creditstr = this.isNegitiveTransform(this.totalincome_credit);
if(this.totalexp_debit < 0 )this.totalexp_debitstr = this.isNegitiveTransform(this.totalexp_debit);
if(this.totalexp_credit < 0 )this.totalexp_creditstr = this.isNegitiveTransform(this.totalexp_credit);

if(this.miantotalDebit < 0 )this.miantotalDebitstr = this.isNegitiveTransform(this.miantotalDebit);
if(this.miantotalCredit < 0 )this.miantotalCreditstr = this.isNegitiveTransform(this.miantotalCredit);
} 

isNegitiveTransform(value: any, args?: any): any {
  var data;
  if(value < 0){
    value=value * -1;
    data = "( "+formatNumber(Number(value), 'en-US', '1.2-2')+" )";

  }
  return data;
}
exportexcel(): void 
  {
    this.error="";
    var f_Date="";
    var fromat=1;
    if(this.filter1){
      if (this.form.invalid) {
        this.error = "Data is required";
        return;
      }
      this.from_date = this.form.get(["fromDate"])!.value;
      f_Date = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
      this.bCode=this.form.get(["branchCode"])!.value;
      this.currencyCode = this.form.get(["currencyCode"])!.value;
      fromat=1;
    }
    else{

    if (this.form2.invalid) {
        this.error = "Data is required";
        return;
      }
      f_Date = this.form2.get(["finYear"])!.value;
      this.bCode=this.form2.get(["branchCode"])!.value;
      this.currencyCode = this.form2.get(["periodCode"])!.value;
      fromat=3;
    }
  

  this.loading = true;
  this.service.exportGeneralTrialExcel(f_Date,this.bCode,this.currencyCode, fromat)
  .pipe(
    map((data: any) => {
      debugger;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'GeneralTrial_'+this.bCode+'_'+this.currencyCode+'.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("General Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate general trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

  exportPDF(): void 
  {
    
    this.error="";
    var f_Date="";
    var fromat=1;
    if(this.filter1){
      if (this.form.invalid) {
        this.error = "Data is required";
        return;
      }
      this.from_date = this.form.get(["fromDate"])!.value;
      f_Date = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
      this.bCode=this.form.get(["branchCode"])!.value;
      this.currencyCode = this.form.get(["currencyCode"])!.value;
      fromat=1;
    }
    else{

    if (this.form2.invalid) {
        this.error = "Data is required";
        return;
      }
      f_Date = this.form2.get(["finYear"])!.value;
      this.bCode=this.form2.get(["branchCode"])!.value;
      this.currencyCode = this.form2.get(["periodCode"])!.value;
      fromat=3;
    }
  this.loading = true;
  this.service.exportGeneralTrialPDF(f_Date,this.bCode,this.currencyCode, fromat)
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
      a.download = 'GeneralTrial_'+this.bCode+'_'+this.currencyCode+'.pdf';
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("General Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate general trial!.. Have the error)";
          }
        this.loading = false;
      });
  }
  onChangeYear(e:any){
    
    this.loading = true;
    this.service.get_period_code_List(e.target.value).subscribe((res:string[])=>{
      this.loading = false;
      this.periodList = res;
    });
  }
  changePeriodfilter(e:any){
    this.amount_clear();
    this.branchList =null;
    this.ccyCode = false;
    if(e.target.value == 'date'){
      this.filter1=true;
      this.loading = true;
    this.service.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    }
    else{
      this.filter1=false;
      this.loading = true;
      this.service.getBranchList(3).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    }
  }
}
