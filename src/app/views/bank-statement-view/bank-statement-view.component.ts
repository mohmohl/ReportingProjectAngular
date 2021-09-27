import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { BankStatementViewData } from 'src/models/BankStatementViewData';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { BankStatementService } from 'src/services/BankStatementService';

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
  selector: 'app-bank-statement-view',
  templateUrl: './bank-statement-view.component.html',
  styleUrls: ['./bank-statement-view.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class BankStatementViewComponent implements OnInit {

  Content :any;
  loading = false;
  acc_no: string;
  fromDate: Date;
  toDate: Date;
  print_date: string;
  error = '';
  form = new FormGroup({
    accno: new FormControl('', Validators.required),
    years: new FormControl('',),
    printDate: new FormControl('Transaction',Validators.required),
    fileType: new FormControl('pdf', Validators.required),
    fromDate: new FormControl(new Date,),
    toDate: new FormControl(new Date,),
  });

  bankStatementViewData : BankStatementViewData;

  sanitizer: any;

  constructor(private bankStatementAPIService: BankStatementService) {  
  }

  ngOnInit() {
  }

  
  submit() {
    if (this.form.invalid) {
      this.error = "Account No is required";
      return;
    }
    this.loading = true;
    this.error = "";
    this.acc_no = this.form.get(["accno"])!.value;
  
   
      this.fromDate = this.form.get(["fromDate"])!.value;
      this.toDate = this.form.get(["toDate"])!.value;
      let fDate = `${this.fromDate.getFullYear()}-${this.fromDate.getMonth()+1}-${this.fromDate.getDate()}`;
      let tDate = `${this.toDate.getFullYear()}-${this.toDate.getMonth()+1}-${this.toDate.getDate()}`;
      this.print_date = this.form.get(["printDate"])!.value;
      
      this.bankStatementAPIService.viewBankStatement(this.acc_no, fDate, tDate,this.print_date)
        .subscribe(
            (res :  BankStatementViewData) => { 
              this.loading = false;
              this.bankStatementViewData = res;

              console.log(this.bankStatementViewData);
            },
            error => {
              console.log("Bankstatement Error >>> "+error)
              debugger;
              if(error != ""){
              this.error = this.acc_no + "(The system cannot find the records!....)";
                }
              this.loading = false;
            });
   

  }
}
