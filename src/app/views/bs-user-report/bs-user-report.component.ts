import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateAdapter} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BSUserReportService } from 'src/services/BSUserReportService';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MultiBranch } from 'src/models/MultiBranch';

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
  selector: 'app-bs-user-report',
  templateUrl: './bs-user-report.component.html',
  styleUrls: ['./bs-user-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
],
encapsulation: ViewEncapsulation.None
})

export class BsUserReportComponent implements OnInit {
  error='';
  msg='';
  loading = false;
  branchList:string[];
  selectedItems = [];
  dropdownList = [];
  dropdownSettings:IDropdownSettings={};
  form = new FormGroup({
    // date: new FormControl(new Date(), Validators.required),
    // branch: new FormControl('', Validators.required),
    role: new FormControl('yes', Validators.required)
  }); 

  constructor(private bsService: BSUserReportService, public datepipe: DatePipe) { 

    this.loading = true;
    bsService.getBranchList().subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
      this.branchList.forEach(b=>{
        this.dropdownList.push({item_id: "'"+b+"'", item_text: b});
      })
    });
  }

  ngOnInit() {
   /* this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];*/
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };
   }

  onItemSelect(item:any){
    console.log(item);
    this.selectedItems.push(item)
    console.log(this.selectedItems);
  }

  onItemDeSelect(item:any){
    console.log(item);
    this.selectedItems = this.selectedItems.filter(e => e !== item);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any){
    this.selectedItems=[];
    this.selectedItems = items
  }

  onDeSelectAll(items: any){
    this.selectedItems=[];
  }

submit() {
    debugger
    this.error="";
    this.msg = "";
    if (this.form.invalid || this.selectedItems.length == 0) {
      this.error = "Data is required";
      return;
    }

    this.loading = true; 
    // let fromDate = this.form.get(["date"])!.value

    // let fDate = `${fromDate.getFullYear()}-${fromDate.getMonth()+1}-${fromDate.getDate()}`;

  const branchData = new MultiBranch();
  branchData.role = this.form.get(["role"])!.value;
  branchData.branchList = this.selectedItems

    this.bsService.exportExcel(branchData).pipe(
      map((data: any) => {
        let blob = new Blob([data], {
          type: "application/vnd.ms-excel" 
        });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Active_UserRegionReport_' + this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') +'.xlsx';
          link.click();
          window.URL.revokeObjectURL(link.href);
        
        this.loading = false;
      })).subscribe(
        res => { },
        error => {
          console.log("Active_UserRegionReport Error >>> "+error)
          if(error != ""){
          this.error = "(The system cannot generate Active_User_Region Report!.. Have the error)";
            }
          this.loading = false;
        });
  }

}
