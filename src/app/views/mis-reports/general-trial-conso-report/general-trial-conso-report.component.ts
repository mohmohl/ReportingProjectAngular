import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrialReport } from 'src/models/TrialReport';
import { DateAdapter} from '@angular/material/core';
import { TrialReportService } from 'src/services/TrialReportService';
import { TrialData } from 'src/models/TrialData';
import { MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { formatNumber } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/HttpService';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonUtil } from 'src/app/shared/common-util';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';

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
  selector: 'app-general-trial-conso-report',
  templateUrl: './general-trial-conso-report.component.html',
  styleUrls: ['./general-trial-conso-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ],
  encapsulation: ViewEncapsulation.None
})

export class GeneralTrialConsoReportComponent implements OnInit {
  error='';
  from_date:Date;
  loading = false;
  data:TrialReport;
  bCode:string;
  minDate = new Date(2021, 5, 30);
  maxDate = new Date();
totalDebit:number=0;
totalDebit_lcy:number=0;
totalCredit:number=0;
totalCredit_lcy:number=0;
totalDebitstr:string;
totalDebit_lcystr:string;
totalCreditstr:string;
migDate : Date;
totalCredit_lcystr:string;
  trialList:TrialData[];
  branchList:string[];
  currencyList:string[];
  currencyCode='';
  ccyCode = false;
  data_message='';

  selectedBrItems = [];
  selectedCcyItems = [];
  dropdownList = [];
  dropdownSettings:IDropdownSettings={};
  dropdownCcySettings:IDropdownSettings={};
  isAllBranch;
  isBaseCcy;

  form = new FormGroup({
    fromDate: new FormControl('', Validators.required),
    branchCode:new FormControl('', Validators.required),
    currencyCode:new FormControl('', Validators.required)
  });

  constructor(private latestService: LatestTrialReportService, private service:TrialReportService, private http: HttpService, private _util:CommonUtil){//,private dateAdapter: DateAdapter<Date>) {
    //this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.loading = true;
    latestService.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    this.loading = true;
    latestService.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      this.currencyList = res;
      this.currencyList = this._util.RemoveElementFromStringArray(this.currencyList, 'Base');
    });

     // date list  
     this.http.doGet("/misreport/getMISMigDate").subscribe(
      (data) => {
        if(data != null ){
          this.migDate = new Date(data.t1) ;
        }
        this.loading = false;
      },
      error => {

        this.loading = false;
      }
    );

   }

  ngOnInit() {  
    
    this.dropdownSettings = {
    
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'ALL',
       unSelectAllText: 'ALL',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 7,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    this.dropdownCcySettings = {
    
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Base',
       unSelectAllText: 'Base',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 7,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

  }
  isNegitive(val: number): boolean {
    if (val < 0) {
     return true;
    } else {
     return false
    }
   }
   
  submit(){
    this.trialList=null;
    this.totalDebit=0;
    this.totalDebit_lcy=0;
    this.totalCredit=0;
    this.totalCredit_lcy=0;
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.from_date = this.form.get(["fromDate"])!.value;
  this.loading = true;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  this.bCode=this.form.get(["branchCode"])!.value;
  this.currencyCode = this.form.get(["currencyCode"])!.value;
  
  if(this.selectedCcyItems.length>1 || this.selectedCcyItems.includes("MMK")){
    this.ccyCode = false;
  }
  else{
    this.ccyCode = true;
  }
  
  if(this.isAllBranch){
    this.bCode = 'ALL';
  }
  else{
    this.bCode = this.selectedBrItems.join(",");
  }

  if(this.isBaseCcy){
    this.currencyCode = "Base";
  }else{
    this.currencyCode = this.selectedCcyItems.join(",");
  }

  this.service.getGeneralTrialReportData(fDate,this.bCode,this.currencyCode, 2).subscribe((res:TrialReport)=>{
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
      
  }
if(this.totalDebit < 0 )this.totalDebitstr = this.isNegitiveTransform(this.totalDebit);
if(this.totalDebit_lcy < 0 )this.totalDebit_lcystr = this.isNegitiveTransform(this.totalDebit_lcy);
if(this.totalCredit < 0 )this.totalCreditstr = this.isNegitiveTransform(this.totalCredit);
if(this.totalCredit_lcy < 0 )this.totalCredit_lcystr = this.isNegitiveTransform(this.totalCredit_lcy);
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
    
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.loading = true;
  this.from_date = this.form.get(["fromDate"])!.value;
  let f_Date = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  this.bCode=this.form.get(["branchCode"])!.value;
  this.currencyCode = this.form.get(["currencyCode"])!.value;

  
  if(this.isAllBranch){
    this.bCode = 'ALL';
  }
  else{
    this.bCode = this.selectedBrItems.join(",");
  }

  if(this.isBaseCcy){
    this.currencyCode = "Base";
  }else{
    this.currencyCode = this.selectedCcyItems.join(",");
  }
  

  this.service.exportGeneralTrialExcel(f_Date,this.bCode,this.currencyCode, 2)
  .pipe(
    map((data: any) => {
      debugger;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Consolidated Trial_'+f_Date+'.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Consolidated Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Consolidated trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

  exportPDF(): void 
  {
    
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.loading = true;
  this.from_date = this.form.get(["fromDate"])!.value;
  let f_date = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  //this.bCode=this.form.get(["branchCode"])!.value;
  //this.currencyCode = this.form.get(["currencyCode"])!.value;

  
  if(this.isAllBranch){
    this.bCode = 'ALL';
  }
  else{
    this.bCode = this.selectedBrItems.join(",");
  }

  if(this.isBaseCcy){
    this.currencyCode = "Base";
  }else{
    this.currencyCode = this.selectedCcyItems.join(",");
  }
  

  this.service.exportGeneralTrialPDF(f_date,this.bCode,this.currencyCode, 2)
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
      a.download = 'Consolidated Trial_'+f_date+'.pdf';
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Consolidated Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Consolidated trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

  onBrItemSelect(item:any){
    console.log(item);   
    // this.selectedBrItems.push(item);  
    console.log(this.selectedBrItems);
  }
  
  onBrItemDeSelect(item:any){
    console.log(item);
    // this.selectedBrItems = this.selectedBrItems.filter(e => e !== item);
    this.isAllBranch=false;
    console.log(this.selectedBrItems);
  }
  
  onBrSelectAll(items: any){
    this.isAllBranch = true;
   // this.selectedBrItems=[];
   // this.selectedBrItems = items;
  }
  
  onBrDeSelectAll(items: any){
    this.isAllBranch = false;
   // this.selectedBrItems=[];
  }


  //ccy
  onCcyItemSelect(item:any){
    console.log(item);   
    // this.selectedCcyItems.push(item);  
    console.log(this.selectedCcyItems);
  }
  
  onCcyItemDeSelect(item:any){
    console.log(item);
    // this.selectedCcyItems = this.selectedCcyItems.filter(e => e !== item);
    this.isBaseCcy = false;
    console.log(this.selectedCcyItems);
  }
  
  onCcySelectAll(items: any){
   // this.selectedCcyItems=[];
    //this.selectedCcyItems = items;
    this.isBaseCcy = true;
  }
  
  onCcyDeSelectAll(items: any){
    this.isBaseCcy = false;
    //this.selectedCcyItems=[];
  }

   

}
