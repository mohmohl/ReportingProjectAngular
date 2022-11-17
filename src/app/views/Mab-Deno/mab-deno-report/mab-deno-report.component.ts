import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { DenoCashInHand } from 'src/models/denoCashInHand';
import { Deno_Detail } from 'src/models/Deno_Detail';
import { Deno_Header } from 'src/models/Deno_Header';
import { Deno_Record } from 'src/models/Deno_Record';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { DenominationService } from 'src/services/DenominationService';
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
  selector: 'app-mab-deno-report',
  templateUrl: './mab-deno-report.component.html',
  styleUrls: ['./mab-deno-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class MabDenoReportComponent implements OnInit {
  error='';
  Importdate:Date;
  successMsg='';
  loading = false;
  field_list:Deno_Record[];
  maxDate = new Date();
  branchList:string[];
  ccyList:string[];
  cash_in_hand:number=0.0;
  cih_request:DenoCashInHand=new DenoCashInHand();
  form = this.fb.group({
    trn_dt: new FormControl(new Date,),
    branch_code:new FormControl('', Validators.required),
    ccy:new FormControl('MMK', Validators.required)
  });
  constructor(private fb:FormBuilder,private denoService: DenominationService,private _util: CommonUtil) { 
    this.loading = true;
    this.field_list=[];
    denoService.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    denoService.getCCYListForDeno().subscribe((res:string[])=>{
      this.loading = false;
      this.ccyList = res;
    });
    
  }
 
  
  ngOnInit() {
  }

  branch_change(){
    this.error="";
  this.successMsg="";
    this.cash_in_hand =0.0;
  }
  import_date_change(){
    this.error="";
  this.successMsg="";
    this.cash_in_hand =0.0;
  }
  ccy_change(){
    this.error="";
  this.successMsg="";
  this.field_list=[];
   this.cash_in_hand =0.0;
   this.loading = true;
 
   
  }

  //search cash in hand
  searchDenoReport(){
    this.error="";
    this.successMsg="";
    if (this.form.invalid) {
      this.form.getError
      this.error = "Data is required !....";
      return;
  }

    this.Importdate = this.form.get(["trn_dt"])!.value;
    this.cih_request.branch=this.form.get(["branch_code"])!.value;
    this.cih_request.ccy=this.form.get(["ccy"])!.value;
    this.cih_request.trn_dt=this._util.getDDMMMYYYY(this.Importdate);
    this.loading =true;
    this.denoService.getDenoReport(this.cih_request).subscribe((res:Deno_Record[])=>{
      this.loading = false;
      this.field_list = res;
      if(this.field_list.length>0){
        this.cash_in_hand=this.field_list[0].cash_in_hand;
      }
    },error=>{
      this.loading = false;
      this.error="System have the error!...."
    }
    );
  }
}
