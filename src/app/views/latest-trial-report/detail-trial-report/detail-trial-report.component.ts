import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrialReport } from 'src/models/TrialReport';
import { DateAdapter} from '@angular/material/core';
import { TrialData } from 'src/models/TrialData';
import { MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { formatDate, formatNumber } from '@angular/common';
import { map } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LatestTrialReportService } from 'src/services/LatestTrialReportService';
import { TrialRequestData } from 'src/models/TrialRequestData';
import { CommonUtil } from 'src/app/shared/common-util';
import { TrialDateSettings } from 'src/models/TrialDateSettings';

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
  selector: 'app-detail-trial-report',
  templateUrl: './detail-trial-report.component.html',
  styleUrls: ['./detail-trial-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
],
encapsulation: ViewEncapsulation.None
})

export class DetailTrialReportComponent implements OnInit {
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

  //for period
  filter1:Boolean=true;
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

  trialList:TrialData[];

  pattern2branchList:string[] = ['REGION_1', 'REGION_2', 'REGION_3', 'REGION_4','REGION_5', 'REGION_6', 'REGION_7', 'REGION_8', 'REGION_9'];
  pattern3branchList:string[] = [];
  currencyList:string[];
  beforeSettingsDate: Boolean = true;
  
  branchCode: string;
  currencyCode=[];
  yearList:string[];
  periodList:string[];
  ccyCode = false;
  data_message='';
  ccy_dropdownSettings:IDropdownSettings={};
  dropdownSettings:IDropdownSettings={};
  selectedBrItems = [];
  selectedCcyItems = [];
  isAllBranch;
  isAllCcy;
  branch = '';
  branch_typeList = [];

  oldGLFlag: boolean = true; 
  //oldGLFlag: boolean = false; 

  WHdate: string;
  MISdate: string;

  settingsDate: TrialDateSettings;

  form1 = new FormGroup({
    from_date: new FormControl(Validators.required), 
    branch: new FormControl('', Validators.required),
    branchCode:new FormControl(''),
    currencyCode:new FormControl([], Validators.required)
  });

  form2 = new FormGroup({
    finYear: new FormControl('', Validators.required),
    branchCode:new FormControl('', Validators.required),
    periodCode:new FormControl(Validators.required)
  });

  constructor(private service: LatestTrialReportService, private _util: CommonUtil){
    this.loading = true;
    service.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      this.currencyList = res;
      this.currencyList = this._util.RemoveElementFromStringArray(this.currencyList, 'Base');
    });

    this.loading = true;
    service.get_finance_cycle_List().subscribe((res:string[])=>{
      this.loading = false;
      this.yearList = res;
    });

    this.loading = true;
    service.getSettingsDate().subscribe((res)=>{
      this.loading = false;
      this.settingsDate = res;
    });
   }
  
  changeDate(e) {
    this.selectedBrItems = [];

    let from_date = e.target.value;
    let reportDate = this._util.getDDMMMYYYY(from_date);
    //console.log("Final Date: " + reportDate)

    const comboData = new TrialRequestData();
    comboData.date = reportDate;
    //this.loading = true;
    // this.service.checkSettingsDate(comboData).subscribe((res)=>{
    //       this.loading = false;
    //       console.log("Check Settings : " + res)
    //      this.beforeSettingsDate = res;
    //      this.intializeBranchType(this.beforeSettingsDate);
    // });

  var WHdate = new Date(this.settingsDate.whDate);
  var MISdate = new Date(this.settingsDate.misDate);
  //console.log("WHdate : " + WHdate);
  //console.log("MISdate : " + MISdate);
    
  if(WHdate >= from_date) {
    this.beforeSettingsDate = true;
  } else {
    if(MISdate >= from_date) {
      this.beforeSettingsDate = true;
    } else {
      this.beforeSettingsDate = false;
    }
  }
  console.log("Check Settings : " + this.beforeSettingsDate)
  this.intializeBranchType(this.beforeSettingsDate);
  } 

  intializeBranchType(isBefore){
    if(isBefore){
      this.branch_typeList = [
        {"value":"AGENCY", "desc" : "AGENCY"},

        {"value":"CURRENCY", "desc" : "CURRENCY"},

        {"value":"DEPARTMENT", "desc" : "DEPARTMENT"},

        {"value":"BY_REGION", "desc" : "BY REGION"},

        {"value":"BY_BRANCH", "desc" : "BY BRANCH"}
      ]
    }else{
      this.branch_typeList = [{"value":"BY_BRANCH", "desc" : "BY BRANCH"}]
    }
  }

  ngOnInit() {
    this.intializeBranchType(true);

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
    this.ccy_dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'BASE',
      unSelectAllText: 'BASE',
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
    //console.log("Branch= "+this.selectedBrItems);
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
    // console.log("CCY= "+this.selectedCcyItems);
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
      // console.log(" pattern3 : " + this.pattern3branchList.length);
      if(this.pattern3branchList.length == 0) {
        this.loading = true;
        this.service.getBranchList(1).subscribe((res:string[])=>{
              this.loading = false;
             this.pattern3branchList = res;
        });
      }

    } else{
      this.branch="";
    }
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
    this.pattern3branchList =null;
    this.ccyCode = false;
    this.error = '';

    if(e.target.value == 'date'){
      this.filter1=true;
      this.loading=true;
      this.form1 = new FormGroup({
        from_date: new FormControl(Validators.required), //new Date(),
        branch: new FormControl('pattern2', Validators.required),
        branchCode:new FormControl(''),
        currencyCode:new FormControl([], Validators.required)
      });
      this.service.getBranchList(1).subscribe((res:string[])=>{
        this.loading = false;
        this.pattern3branchList = res;
      });
    }
    else{
      this.filter1=false;
      this.loading=true;
      this.service.getBranchList(3).subscribe((res:string[])=>{
        this.loading = false;
        this.pattern3branchList = res;
      });
    }
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

  submit(){
    this.trialList=null;
    this.totalDebit=0;
    this.totalDebit_lcy=0;
    this.totalCredit=0;
    this.totalCredit_lcy=0;
  if (this.form1.invalid) {
      this.error = "Data is required";
      return;
  } else if(!this.beforeSettingsDate && this.selectedBrItems.length >1) {
      this.error = "Multi branch allow only for back date!";
      return;
  }

  this.error="";
  this.from_date = this.form1.get(["from_date"])!.value;
  this.loading = true;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;

  if(this.branch ==""){
    this.branchCode=this.form1.get(["branch"])!.value
  } else{
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
          this.branchCode = this.form1.get(["branchCode"])!.value;
        }
        //this.branchCode = "'"+ this.branchCode+ "'";
      }
  }
  if(this.isAllCcy){
    this.currencyCode = ["BASE"];
    this.ccyCode = false;
  }else{
    //this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode =  this.form1.get(["currencyCode"])!.value;
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
  comboData.format = "1"

  this.service.getDetailTrialReportData(comboData).subscribe((res:TrialReport)=>{
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

  periodSubmit(){
  this.error ="";
  this.amount_clear();

  if (this.form2.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";

  this.ccyCode = false;
  this.loading = true;

  const comboData = new TrialRequestData();
  comboData.date = this.form2.get(["finYear"])!.value;
  comboData.branchCode =  this.form2.get(["branchCode"])!.value;
  comboData.currencyCode = this.form2.get(["periodCode"])!.value;
  comboData.format = "3";

  this.service.getDetailTrialReportData(comboData).subscribe((res:TrialReport)=>{
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

  exportExcel(): void 
  {
    this.error="";
    var f_Date="";
    var fromat="1";
    var period_code="";
    if(this.filter1){
    if (this.form1.invalid) {
      this.error = "Data is required";
      return;
    } else if(!this.beforeSettingsDate && this.selectedBrItems.length >1) {
      this.error = "Multi branch allow only for back date!";
      return;
  }
  this.from_date = this.form1.get(["from_date"])!.value;
  f_Date = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  
  if(this.branch ==""){
    this.branchCode=this.form1.get(["branch"])!.value
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
        this.branchCode = this.form1.get(["branchCode"])!.value;
      }
      //this.branchCode = "'"+ this.branchCode+ "'";
    }
    }

  if(this.isAllCcy){
    this.currencyCode = ["BASE"];
    this.ccyCode = false;
  }else{
    //this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode =  this.form1.get(["currencyCode"])!.value;
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
  fromat="1";
}
//for period
else{
  if (this.form2.invalid) {
    this.error = "Data is required";
    return;
  }
  f_Date = this.form2.get(["finYear"])!.value;
  this.branchCode=this.form2.get(["branchCode"])!.value;
  period_code = this.form2.get(["periodCode"])!.value;
  fromat="3";
}
  
  this.loading = true;
  

  const comboData = new TrialRequestData();
  comboData.date = f_Date;
  comboData.branchCode =  this.branchCode;
  comboData.currencyCode = period_code;
  comboData.currencyCodelist=this.currencyCode
  comboData.format = fromat;

  this.service.exportDetailTrialExcel(comboData)
  .pipe(
    map((data: any) => {
      ;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // update file name
        //console.log("Branch List: " + this.branchCode)
        var b = this.branchCode.split(",");
        var bName = "";
        if(b.length > 3) {
          for (let i = 0; i < 3; i++) {
            bName += "'" + b[i] + "'";
            if ((3 - i) != 1) {
              bName += ",";
            }
          }

          bName += ", more";
        } else {
          bName = this.branchCode;
        }

        if(this.filter1) {
          link.download = 'DetailTrial_'+bName+'_'+this.currencyCode+'.xlsx';
        } else {
          link.download = 'DetailTrial_'+bName+'_'+period_code+'.xlsx';
        }
        //console.log("File Name: " + link.download);

        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Detail Trial Error >>> "+error)
        ;
        if(error != ""){
        this.error = "(The system cannot generate detail trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

  exportPDF(): void 
  {
    this.error="";
    var f_Date="";
    var fromat="1";
    var period_code="";
    if(this.filter1){
    if (this.form1.invalid) {
      this.error = "Data is required";
      return;
    } else if(!this.beforeSettingsDate && this.selectedBrItems.length >1) {
      this.error = "Multi branch allow only for back date!";
      return;
  }
  this.from_date = this.form1.get(["from_date"])!.value;
  f_Date = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;
  
  if(this.branch ==""){
    this.branchCode=this.form1.get(["branch"])!.value
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
        this.branchCode = this.form1.get(["branchCode"])!.value;
      }
      //this.branchCode = "'"+ this.branchCode+ "'";
    }
    }

  if(this.isAllCcy){
    this.currencyCode = ["BASE"];
    this.ccyCode = false;
  }else{
    //this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode =  this.form1.get(["currencyCode"])!.value;
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
  fromat="1";
}
//for period
else{
  if (this.form2.invalid) {
    this.error = "Data is required";
    return;
  }
  f_Date = this.form2.get(["finYear"])!.value;
  this.branchCode=this.form2.get(["branchCode"])!.value;
  period_code = this.form2.get(["periodCode"])!.value;
  fromat="3";
}
  
  this.loading = true;
  

  const comboData = new TrialRequestData();
  comboData.date = f_Date;
  comboData.branchCode =  this.branchCode;
  comboData.currencyCode = period_code;
  comboData.currencyCodelist=this.currencyCode
  comboData.format = fromat;

  this.service.exportDetailTrialPDF(comboData)
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

        // update file name
        //console.log("Branch List: " + this.branchCode)
        var b = this.branchCode.split(",");
        var bName = "";
        if(b.length > 3) {
          for (let i = 0; i < 3; i++) {
            bName += "'" + b[i] + "'";
            if ((3 - i) != 1) {
              bName += ",";
            }
          }

          bName += ", more";
        } else {
          bName = this.branchCode;
        }

        if(this.filter1) {
          a.download = 'DetailTrial_'+bName+'_'+this.currencyCode+'.pdf';
        } else {
          a.download = 'DetailTrial_'+bName+'_'+period_code+'.pdf';
        }
        //console.log("File Name: " + link.download);
      
      a.click();
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Detail Trial Error >>> "+error)
        ;
        if(error != ""){
        this.error = "(The system cannot generate detail trial!.. Have the error)";
          }
        this.loading = false;
      });
  }

}

