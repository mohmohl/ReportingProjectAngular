import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { HttpService } from 'src/services/HttpService';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { JournalListingService } from 'src/services/JournalListingService';
import { JournalListingData } from 'src/models/JournalListingData';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';

 export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

// <!-- autocomplete -->
export interface StateGroup {
  letter: string;
  names: string[];
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
// <!-- autocomplete -->

@Component({
    selector: 'app-journal-listing',
    templateUrl: './journal-listing.component.html',
    styleUrls: ['./journal-listing.component.css'],
    providers: [
      {provide: DateAdapter, useClass: PickDateAdapter},
      {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ],
  encapsulation: ViewEncapsulation.None
  })

  export class JournalListingComponent implements OnInit {

  // <!-- autocomplete -->
  stateForm: FormGroup = this._formBuilder.group({
    //stateGroup: '',
    stateGroup: new FormControl('', Validators.required)
  });

  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['ALL', 'ATM']
  }, {
    letter: 'O',
    names: ['OBDX', 'OTC']
  }, {
    letter: 'S',
    names: ['SYSTEM']
  }];

  stateGroupOptions: Observable<StateGroup[]>;
 // <!-- autocomplete -->


  error='';
  from_date:Date;
  loading = false;
 
  branchList:string[];
  currencyList:string[];
  transCodeList: string[];  

  branchCode: string;
  currencyCode:string;
  transCode: string;
  
  data_message='';

  selectedBrItems = [];
  selectedCcyItems = [];
  selectedTrnsItems = [];
  
  isAllBranch;
  isAllCcy;
  isAllTrns;
  dropdownSettings:IDropdownSettings={};

  selectedUserID = 'ALL';
  selectedOption = ['ALL'];

  form = new FormGroup({
    //date: new FormControl('', Validators.required),
    date: new FormControl(new Date,),
    branchCode: new FormControl(this.selectedOption, Validators.required),
    //branchCode: [this.selectedOption, [Validators.required]],
    currencyCode: new FormControl(''),
    trnsCode: new FormControl(''),
    status: new FormControl('A', Validators.required),
    selectedUserID: new FormControl(''),
    trnsRefNo: new FormControl(''),
  });

  constructor(private service: JournalListingService, private http: HttpService,private _formBuilder: FormBuilder,public datepipe: DatePipe){
    
    this.loading = true;
    //service.getBranchList().subscribe((res:string[])=>{//all branch
    //service.getBranchListForMigration().subscribe((res:string[])=>{//home branch
    service.getBranchList(1).subscribe((res:string[])=>{//access branch
      this.loading = false;
      this.branchList = res;
    });

    this.loading = true;
    service.getCurrencyList().subscribe((res:string[])=>{
      this.loading = false;
      this.currencyList = res;
    });

   /* this.loading = true;
    service.getTransCodeList().subscribe((res:string[])=>{
      this.loading = false;
      this.transCodeList = res;
    });*/

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

// <!-- autocomplete -->
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
// <!-- autocomplete -->
  }

// <!-- autocomplete -->
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }
    return this.stateGroups;
  }
  // <!-- autocomplete -->

  
  // For Branch
  onBrItemSelect(item:any){
    //console.log(item);   
    //console.log(this.selectedBrItems);
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
    //console.log(this.selectedCcyItems);
  }
  
  onCcyItemDeSelect(item:any){
    //console.log(item);
    this.isAllCcy = false;
    //console.log(this.selectedCcyItems);
  }
  
  onCcySelectAll(items: any){
    this.isAllCcy = true;
  }
  
  onCcyDeSelectAll(items: any){
    this.isAllCcy = false;
  }

  // For TransCode
  onTrnsItemSelect(item:any){
    //console.log(item);   
    //console.log(this.selectedTrnsItems);
  }
  
  onTrnsItemDeSelect(item:any){
    //console.log(item);
    this.isAllTrns=false;
    //console.log(this.selectedTrnsItems);
  }
  
  onTrnsSelectAll(items: any){
    this.isAllTrns = true;
  }
  
  onTrnsDeSelectAll(items: any){
    this.isAllTrns = false;
  }

  exportExcel(): void {
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }

    this.error="";
    this.loading = true;

    this.branchCode = this.form.get(["branchCode"])!.value;

    if(this.isAllCcy){
      this.currencyCode = "ALL";
    }else{
      this.currencyCode = this.selectedCcyItems.join("','");
      this.currencyCode = "'"+ this.currencyCode+ "'";
    }

    this.from_date = this.form.get(["date"])!.value;
    let fDate = this.datepipe.transform(this.from_date,'dd-MMM-yyyy');
    //let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;

    const comboData = new JournalListingData();
    comboData.date = fDate;
    comboData.branchCode = this.branchCode;
    comboData.currencyCode = this.currencyCode;
    //comboData.transCode = this.transCode;
    comboData.status = this.form.get(["status"])!.value;
    comboData.userId = this.selectedUserID;
    comboData.transRefNo = this.form.get(["trnsRefNo"])!.value;

    console.log("excel >>>>" + JSON.stringify(comboData));

    this.service.exportJournalListingExcel(comboData)
    .pipe(
    map((data: any) => {
      debugger;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        //link.download = 'JournalListing_'+ " " +'.xlsx';
        link.download = 'JournalListing.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Journal Listing Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Journal Listing Report!.. Have the error)";
          }
        this.loading = false;
      });

  }
  /*
  exportExcel(): void {
  if (this.form.invalid) {
    this.error = "Data is required";
    return;
  }

  this.error="";
  this.loading = true;
    
  if(this.isAllBranch){
    this.branchCode = 'ALL';
  }
  else{
    this.branchCode = this.selectedBrItems.join("','");
    this.branchCode = "'"+ this.branchCode+ "'";
  }

  if(this.isAllCcy){
    this.currencyCode = "ALL";
  }else{
    this.currencyCode = this.selectedCcyItems.join("','");
    this.currencyCode = "'"+ this.currencyCode+ "'";
  }

  if(this.isAllTrns){
    this.transCode = "ALL";
  }else{
    this.transCode = this.selectedTrnsItems.join("','");
    this.transCode = "'"+ this.transCode+ "'";
  }

  this.from_date = this.form.get(["date"])!.value;
  let fDate = `${this.from_date.getFullYear()}-${this.from_date.getMonth()+1}-${this.from_date.getDate()}`;

  const comboData = new JournalListingData();
  comboData.date = fDate;
  comboData.branchCode = this.branchCode;
  comboData.currencyCode = this.currencyCode;
  comboData.transCode = this.transCode;
  comboData.status = this.form.get(["status"])!.value;
  comboData.userId = this.selectedUserID;
  comboData.transRefNo = this.form.get(["trnsRefNo"])!.value;
  
  this.service.exportJournalListingExcel(comboData)
  .pipe(
    map((data: any) => {
      debugger;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        //link.download = 'JournalListing_'+ " " +'.xlsx';
        link.download = 'JournalListing.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("Journal Listing Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot cannot generate Journal Listing Report!.. Have the error)";
          }
        this.loading = false;
      });
  }*/

  // <!-- autocomplete -->
  clearSelection() {
    this.selectedUserID = "";
  }

  // click() {
  //   alert(this.selectedUserID)
  // }
// <!-- autocomplete -->

}
