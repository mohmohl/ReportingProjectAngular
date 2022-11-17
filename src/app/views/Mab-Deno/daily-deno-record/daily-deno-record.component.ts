import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { DenoCashInHand } from 'src/models/denoCashInHand';
import { Deno_Detail } from 'src/models/Deno_Detail';
import { Deno_Header } from 'src/models/Deno_Header';
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
  selector: 'app-daily-deno-record',
  templateUrl: './daily-deno-record.component.html',
  styleUrls: ['./daily-deno-record.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class DailyDenoRecordComponent implements OnInit {
  error='';
  Importdate:Date;
  successMsg='';
  loading = false;
  field_list:Deno_Detail[];
  maxDate = new Date();
  branchList:string[];
  ccyList:string[];
  cash_in_hand:number=0.0;
  deno_in_hand:number=0.0;
  cih_request:DenoCashInHand=new DenoCashInHand();
  form = this.fb.group({
    trn_dt: new FormControl(new Date,),
    branch_code:new FormControl('', Validators.required),
    ccy:new FormControl('MMK', Validators.required),
    detailList: []
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
    this.denoService.getCodeAndValueListForDeno('MMK').subscribe((res:Deno_Detail[])=>{
      this.loading = false;
      this.field_list=res;
      this.form=this.fb.group({
        trn_dt: new FormControl(new Date,),
        branch_code:new FormControl('', Validators.required),
        ccy:new FormControl('MMK', Validators.required),
        detailList: this.setFieldsList(res)
        });
    });

    

  }
  setFieldsList(field_list:Deno_Detail[]) : FormArray{
    const arr = this.fb.array([]);
    
    var f:FormControl;
    
    field_list.forEach(e =>{
      
        arr.push(
          this.fb.group({
            deno_code:e.deno_code,
            deno_code_value:e.deno_code_value,
            deno_count:f,
          })
        );
    });
    return arr;
  }
  
  ngOnInit() {
  }
  submit(formdata: Deno_Header){
    this.error="";
    this.successMsg="";
    if (this.form.invalid) {
      this.form.getError
      this.error = "Data is required !....";
      return;
  }
  if( this.cash_in_hand != this.deno_in_hand){
    this.error = "Amount is not balance!....";
    return;
  }
  else if(this.cash_in_hand==0 && this.deno_in_hand==0){
    this.error = "Amount is not 0!....";
    return;
  }

  this.Importdate = this.form.get(["trn_dt"])!.value;
  this.loading = true;
  let ImDate = `${this.Importdate.getFullYear()}-${this.Importdate.getMonth()+1}-${this.Importdate.getDate()}`;
 formdata.trn_dt=this._util.getDDMMMYYYY(this.Importdate);
 formdata.detailList =this.getFormFielsList();
 formdata.ccy=this.form.get(["ccy"])!.value;
 formdata.branch_code=this.form.get(["branch_code"])!.value;
 formdata.cash_in_hand=this.cash_in_hand

  this.denoService.deno_data_daily_update(formdata).subscribe((res:Boolean)=>{
    this.loading = false;
    if(res){
      this.successMsg="Data is successful saved!....";
    }
    else{
      this.error="Cannot Save";
    }
    
  },(error) => {
    this.successMsg="";
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
  
  //end
}


valueChanges(){
  this.error="";
  this.successMsg="";
 this. getFieldOfValue();
}
getFieldOfValue(){
  this.deno_in_hand=0.0;
  for(const field of this.form!.get('detailList')!.value){
    
    this.deno_in_hand=this.deno_in_hand + (field.deno_code_value*field.deno_count);
    }
    
  }

getFormFielsList():Deno_Detail[]{
  const fieldList:Deno_Detail[]=[];
  for(const field of this.form!.get('detailList')!.value){
    const f : Deno_Detail={
      deno_code: field.deno_code,
      deno_count: field.deno_count,
      ccy: this.form.get(["ccy"])!.value,
      deno_code_value: field.deno_code_value,
    };
    fieldList.push(f);
  }
  return fieldList;
}
  branch_change(){
    this.error="";
  this.successMsg="";
    this.cash_in_hand =0.0;
    this.deno_in_hand =0.0;
    this.field_list=[]
    this.loading = true;
    this.denoService.getCodeAndValueListForDeno(this.form.get(["ccy"])!.value).subscribe((res:Deno_Detail[])=>{
      this.loading = false;
      this.field_list=res;
      this.form=this.fb.group({
        trn_dt: new FormControl(new Date,),
        branch_code:new FormControl(this.form.get(["branch_code"])!.value, Validators.required),
        ccy:new FormControl(this.form.get(["ccy"])!.value, Validators.required),
        detailList: this.setFieldsList(res)
        });
    });
  }
  import_date_change(){
    this.error="";
  this.successMsg="";
    this.cash_in_hand =0.0;
    this.deno_in_hand =0.0;
  }
  ccy_change(){
    this.error="";
  this.successMsg="";
  this.field_list=[];
   this.cash_in_hand =0.0;
   this.deno_in_hand =0.0;
   this.loading = true;
   this.denoService.getCodeAndValueListForDeno(this.form.get(["ccy"])!.value).subscribe((res:Deno_Detail[])=>{
    this.loading = false;
    this.field_list=res;
    this.form=this.fb.group({
      trn_dt: new FormControl(new Date,),
      branch_code:new FormControl(this.form.get(["branch_code"])!.value, Validators.required),
      ccy:new FormControl(this.form.get(["ccy"])!.value, Validators.required),
      detailList: this.setFieldsList(res)
      });
  });
   
  }

  //search cash in hand
  searchCashInHand(){
    this.error="";
  this.successMsg="";
    this.Importdate = this.form.get(["trn_dt"])!.value;
    this.cih_request.branch=this.form.get(["branch_code"])!.value;
    this.cih_request.ccy=this.form.get(["ccy"])!.value;
    this.cih_request.trn_dt=this._util.getDDMMMYYYY(this.Importdate);
    this.loading =true;
    this.denoService.getCashInHand(this.cih_request).subscribe((res:number)=>{
      this.loading = false;
      this.cash_in_hand = res;
    },error=>{
      this.loading = false;
      this.error="System have the error!...."
    }
    );
  }
}
