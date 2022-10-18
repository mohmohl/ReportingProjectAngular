import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrialReport } from 'src/models/TrialReport';
import { DateAdapter} from '@angular/material/core';
import { TrialData } from 'src/models/TrialData';
import { MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { formatNumber } from '@angular/common';
import { map } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { TrialRequestData } from 'src/models/TrialRequestData';
import { CommonUtil } from 'src/app/shared/common-util';

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
],
encapsulation: ViewEncapsulation.None
})

export class GeneralTrialReportComponent implements OnInit {
  error='';
  from_date:Date;
  loading = false;
  data:TrialReport;
  totalDebit:number=0;
  totalDebit_lcy:number=0;
  totalCredit:number=0;
  totalCredit_lcy:number=0;
  totalDebitstr:string;
  totalDebit_lcystr:string;
  totalCreditstr:string;
  totalCredit_lcystr:string;
  trialList:TrialData[];

  pattern2branchList:string[] = ['REGION_1', 'REGION_2', 'REGION_3', 'REGION_4','REGION_5', 'REGION_6', 'REGION_7', 'REGION_8', 'REGION_9'];
  pattern3branchList:string[];
  currencyList:string[];
  
  branchCode: string;
  currencyCode=[];
  ccyCode = false;
  data_message='';
  ccy_dropdownSettings:IDropdownSettings={};
  dropdownSettings:IDropdownSettings={};
  selectedBrItems = [];
  selectedCcyItems = [];
  isAllBranch;
  isAllCcy;
  branch = '';
  dataExist: Boolean = true;

  form = new FormGroup({
    from_date: new FormControl(new Date(), Validators.required),
    branch: new FormControl('pattern2', Validators.required),
    branchCode:new FormControl(''),
    currencyCode:new FormControl([], Validators.required)
  });

  constructor(private service: LatestTrialReportService, private _util: CommonUtil){
    
    this.loading = true;
    service.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      console.log(res)
      this.currencyList = res;
    });

    this.loading = true;
    service.getBranchList().subscribe((res:string[])=>{
          this.loading = false;
          console.log(res)
         this.pattern3branchList = res;
    });

   }

  changeBranch(e) {
    this.branch = e.target.value;
    this.selectedBrItems = [];
  }

  changeDate(e) {
    this.selectedBrItems = [];
    //console.log("Hello date changed")
    this.form = new FormGroup({
      from_date: new FormControl(this.form.get(["from_date"])!.value,Validators.required), 
      branch: new FormControl('', Validators.required),
      branchCode:new FormControl(''),
      currencyCode:new FormControl([], Validators.required)
    });

    let from_date = e.target.value;
    let reportDate = this._util.getDDMMMYYYY(from_date);
    //console.log("Final Date: " + reportDate)

    const comboData = new TrialRequestData();
    comboData.date = reportDate;
    this.loading = true;
    this.service.checkSettingsDate(comboData).subscribe((res)=>{
          this.loading = false;
          console.log("Check Settings : " + res)
         this.dataExist = res;
    });
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
      itemsShowLimit: 2,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Data Available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this.selectedCcyItems = []
  }

  // For Branch
  onBrItemSelect(item:any){
    //console.log(item);   
    console.log("Branch= "+this.selectedBrItems);
  }
  
  onBrItemDeSelect(item:any){
    //console.log(item);
    this.isAllBranch=false;
    //console.log(this.selectedBrItems);
  }
  
  onBrSelectAll(items: any){
    this.isAllBranch = true;
  }
  
  onBrDeSelectAll(items: any){
    this.isAllBranch = false;
  }

  // For ccy 
  onCcyItemSelect(item:any){
    //console.log(item);   
    console.log("CCY= "+this.selectedCcyItems);
    console.log("CCY2= "+this.form.get(["currencyCode"])!.value);
    
  }
  
  onCcyItemDeSelect(item:any){
    //console.log(item);
    this.isAllCcy = false;
   
  }
  
  onCcySelectAll(items: any){
    this.isAllCcy = true;
  }
  
  onCcyDeSelectAll(items: any){
    this.isAllCcy = false;
  }

  isNegitive(val: number): boolean {
    if (val < 0) {
     return true;
    } else {
     return false
    }
   }
   branchOnChange(event:any){
    this.branch = event.target.value;
    this.selectedBrItems = [];
    if(this.branch == "BY_REGION"){
      this.branch="pattern2";
    }
    else if(this.branch == "BY_BRANCH"){
      this.branch="pattern3";
    }
    else{
      this.branch="";
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
  this.from_date = this.form.get(["from_date"])!.value;
  this.loading = true;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  // this.bCode=this.form.get(["branchCode"])!.value;
  // this.currencyCode = this.form.get(["currencyCode"])!.value;
  
if(this.branch ==""){
  this.branchCode=this.form.get(["branch"])!.value
}
  else{
  if(this.isAllBranch){
    if(this.branch == 'pattern2') {
      this.branchCode = 'ALL_REGION';
    } else {
      this.branchCode = 'ALL_BRANCH';
    }
  }
  else{
    if(this.branch == 'pattern2' || this.branch == 'pattern3') {
      this.branchCode = this.selectedBrItems.join(",");
    } else {
      this.branchCode = this.form.get(["branchCode"])!.value;
    }
    //this.branchCode = "'"+ this.branchCode+ "'";
  }
  }
  if(this.isAllCcy){
    this.currencyCode = ["BASE"];
    this.ccyCode = false;
  }else{
    //this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode =  this.form.get(["currencyCode"])!.value;
    if(this.currencyCode.length == 1){
      if(this.currencyCode[0] != "MMK"){
        this.ccyCode = true;
      }
      else{
        this.ccyCode = false;
      }
    }
    else{
      this.ccyCode = false;
    }
  }
 
  const comboData = new TrialRequestData();
  comboData.date = fDate;
  comboData.branchCode =  this.branchCode;
  comboData.currencyCodelist = this.currencyCode;

  this.service.getGeneralTrialReportData(comboData).subscribe((res:TrialReport)=>{

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

exportExcel(): void 
{
  debugger
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
  this.error="";
  this.loading = true;
  this.from_date = this.form.get(["from_date"])!.value;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  
  if(this.branch ==""){
    this.branchCode=this.form.get(["branch"])!.value
  }
    else{
    if(this.isAllBranch){
      if(this.branch == 'pattern2') {
        this.branchCode = 'ALL_REGION';
      } else {
        this.branchCode = 'ALL_BRANCH';
      }
    }
    else{
      if(this.branch == 'pattern2' || this.branch == 'pattern3') {
        this.branchCode = this.selectedBrItems.join(",");
      } else {
        this.branchCode = this.form.get(["branchCode"])!.value;
      }
      //this.branchCode = "'"+ this.branchCode+ "'";
    }
    }

  if(this.isAllCcy){
    this.currencyCode = ["BASE"];
    this.ccyCode = false;
  }else{
    //this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode =  this.form.get(["currencyCode"])!.value;
    if(this.currencyCode.length == 1){
      if(this.currencyCode[0] != "MMK"){
        this.ccyCode = true;
      }
      else{
        this.ccyCode = false;
      }
    }
    else{
      this.ccyCode = false;
    }
  }

  const comboData = new TrialRequestData();
  comboData.date = fDate;
  comboData.branchCode =  this.branchCode;
  comboData.currencyCodelist = this.currencyCode;


  this.service.exportGeneralTrialExcel(comboData)
  .pipe(
    map((data: any) => {
      debugger;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'GeneralTrial_'+this.branchCode+'_'+this.currencyCode+'.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("General Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot generate detail trial!.. Have the error)";
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
  this.from_date = this.form.get(["from_date"])!.value;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;

  if(this.branch ==""){
    this.branchCode=this.form.get(["branch"])!.value
  }
    else{
    if(this.isAllBranch){
      if(this.branch == 'pattern2') {
        this.branchCode = 'ALL_REGION';
      } else {
        this.branchCode = 'ALL_BRANCH';
      }
    }
    else{
      if(this.branch == 'pattern2' || this.branch == 'pattern3') {
        this.branchCode = this.selectedBrItems.join(",");
      } else {
        this.branchCode = this.form.get(["branchCode"])!.value;
      }
      //this.branchCode = "'"+ this.branchCode+ "'";
    }
    }

  if(this.isAllCcy){
    this.currencyCode = ["BASE"];
    this.ccyCode = false;
  }else{
    //this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode =  this.form.get(["currencyCode"])!.value;
    if(this.currencyCode.length == 1){
      if(this.currencyCode[0] != "MMK"){
        this.ccyCode = true;
      }
      else{
        this.ccyCode = false;
      }
    }
    else{
      this.ccyCode = false;
    }
  }

  const comboData = new TrialRequestData();
  comboData.date = fDate;
  comboData.branchCode =  this.branchCode;
  comboData.currencyCodelist = this.currencyCode;

  this.service.exportGeneralTrialPDF(comboData)
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
      a.target = '_blank'; 
      a.download = 'GeneralTrial_'+this.branchCode+'_'+this.currencyCode+'.pdf';
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("General Trial Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot generate detail trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

}


