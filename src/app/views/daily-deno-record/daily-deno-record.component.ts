import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { CommonUtil } from 'src/app/shared/common-util';
import { DenoCashInHand } from 'src/models/denoCashInHand';
import { DenominationModel } from 'src/models/DenominationModel';
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
    denoService.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
    this.form=this.fb.group({
    trn_dt: new FormControl(new Date,),
    branch_code:new FormControl('', Validators.required),
    ccy:new FormControl('MMK', Validators.required),
    detailList: this.setFieldsList('MMK')
    });

  }
  setFieldsList(ccy:string) : FormArray{
    const arr = this.fb.array([]);
   
    var f:FormControl;
    if(ccy=="MMK"){this.getMMK_list();}
    else if (ccy=="EUR"){this.getEUR_list();}
    else if (ccy=="USD"){this.getUSD_list();}
    else if (ccy=="SGD"){this.getSGD_list();}
    else if (ccy=="THB"){this.getTHB_list();}
    
    this.field_list.forEach(e =>{
      
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
  getMMK_list(){
    this.field_list=[];
    var deno:Deno_Detail=new Deno_Detail();
    deno.deno_code='K10000';
    deno.deno_code_value=10000;
    this.field_list.push(deno);
    
    deno=new Deno_Detail();
    deno.deno_code='K5000';
    deno.deno_code_value=5000;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K1000';
    deno.deno_code_value=1000;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K500';
    deno.deno_code_value=500;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K200';
    deno.deno_code_value=200;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K100';
    deno.deno_code_value=100;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K50';
    deno.deno_code_value=50;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K20';
    deno.deno_code_value=20;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K10';
    deno.deno_code_value=10;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='K1';
    deno.deno_code_value=1;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='P1';
    deno.deno_code_value=0.01;
    this.field_list.push(deno);
  }

  getEUR_list(){
    this.field_list=[];
    var deno:Deno_Detail=new Deno_Detail();
    deno.deno_code='10';
    deno.deno_code_value=10;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='20';
    deno.deno_code_value=20;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='50';
    deno.deno_code_value=50;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='100';
    deno.deno_code_value=100;
    this.field_list.push(deno);
  }

  getUSD_list(){
    this.field_list=[];
    var deno:Deno_Detail=new Deno_Detail();
    deno.deno_code='DC1';
    deno.deno_code_value=1;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D1';
    deno.deno_code_value=1;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D2';
    deno.deno_code_value=2;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D5';
    deno.deno_code_value=5;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D10';
    deno.deno_code_value=10;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D20';
    deno.deno_code_value=20;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D50';
    deno.deno_code_value=50;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D100';
    deno.deno_code_value=100;
    this.field_list.push(deno);

  }

  getSGD_list(){
    this.field_list=[];
    var deno:Deno_Detail=new Deno_Detail();
    deno.deno_code='D2';
    deno.deno_code_value=2;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D10';
    deno.deno_code_value=10;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D50';
    deno.deno_code_value=50;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D100';
    deno.deno_code_value=100;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='D1000';
    deno.deno_code_value=1000;
    this.field_list.push(deno);

    

  }
  getTHB_list(){
    this.field_list=[];
    var deno:Deno_Detail=new Deno_Detail();
    deno.deno_code='TB100';
    deno.deno_code_value=100;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='TB500';
    deno.deno_code_value=500;
    this.field_list.push(deno);

    deno=new Deno_Detail();
    deno.deno_code='TB1000';
    deno.deno_code_value=1000;
    this.field_list.push(deno);

  }
  ngOnInit() {
  }
  submit(formdata: Deno_Header){
    if (this.form.invalid) {
      this.form.getError
      this.error = "Data is required >>"+ this.form.getError;
      return;
  }
  this.error="";
  this.successMsg="";
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
    this.cash_in_hand =0.0;
  }
  import_date_change(){
    this.cash_in_hand =0.0;
  }
  ccy_change(){
   this.cash_in_hand =0.0;
   this.form=this.fb.group({
    trn_dt: new FormControl(new Date,),
    branch_code:new FormControl(this.form.get(["branch_code"])!.value, Validators.required),
    ccy:new FormControl(this.form.get(["ccy"])!.value, Validators.required),
    detailList: this.setFieldsList(this.form.get(["ccy"])!.value)
    });
  }

  //search cash in hand
  searchCashInHand(){
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
