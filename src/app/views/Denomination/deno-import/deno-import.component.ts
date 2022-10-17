import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { DenominationModel } from 'src/models/DenominationModel';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { DenominationService } from 'src/services/DenominationService';
import { TrialReportService } from 'src/services/TrialReportService';
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
  selector: 'app-deno-import',
  templateUrl: './deno-import.component.html',
  styleUrls: ['./deno-import.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class DenoImportComponent implements OnInit {
  error='';
  Importdate:Date;
  successMsg='';
  loading = false;
  maxDate = new Date();
  branchList:string[];
  form = new FormGroup({
    import_date: new FormControl(new Date,),
    branch:new FormControl('', Validators.required),
    denolion1:new FormControl('', Validators.required),
denolion5:new FormControl('', Validators.required),
denolion10:new FormControl('', Validators.required),
denolion20:new FormControl('', Validators.required),
denolion50:new FormControl('', Validators.required),
denolion100:new FormControl('', Validators.required),
denolion200:new FormControl('', Validators.required),
denolion500:new FormControl('', Validators.required),
denolion1000:new FormControl('', Validators.required),
denokl200:new FormControl('', Validators.required),
denokl500:new FormControl('', Validators.required),
denokl1000:new FormControl('', Validators.required),
denorwe5000:new FormControl('', Validators.required),
denorwe10000:new FormControl('', Validators.required),
denorwen5000:new FormControl('', Validators.required),
denorwen10000:new FormControl('', Validators.required),
denonbd50:new FormControl('', Validators.required),
denonbd100:new FormControl('', Validators.required),
denonbd200:new FormControl('', Validators.required),
denonbd500:new FormControl('', Validators.required),
denonbd1000:new FormControl('', Validators.required),
denonbd5000:new FormControl('', Validators.required),
denonbd10000:new FormControl('', Validators.required)
  });
  constructor(private denoService: DenominationService,private service:TrialReportService) { 
    this.loading = true;
    service.getBranchList(1).subscribe((res:string[])=>{
      this.loading = false;
      this.branchList = res;
    });
  }

  ngOnInit() {
  }
  submit(formdata: DenominationModel){
    if (this.form.invalid) {
      this.form.getError
      this.error = "Data is required >>"+ this.form.getError;
      return;
  }
  this.error="";
  this.successMsg="";
  this.Importdate = this.form.get(["import_date"])!.value;
  this.loading = true;
  let ImDate = `${this.Importdate.getFullYear()}-${this.Importdate.getMonth()+1}-${this.Importdate.getDate()}`;
  console.log("Date = "+ImDate);
  formdata.importdate=ImDate;
  console.log("form Data = "+ formdata.branch)
  this.denoService.importData(formdata).subscribe((res:number)=>{
    this.loading = false;
    if(res == 1){
      this.successMsg="Data is successful saved!....";
    }
    else if(res == 2){
      this.error="Records are already exist with this date and this branch!...";
    }
    
  },(error) => {
    this.successMsg="";
    this.loading = false;
    this.error="Internal Server Error";
    console.log(error);
  });
  
  }
}
