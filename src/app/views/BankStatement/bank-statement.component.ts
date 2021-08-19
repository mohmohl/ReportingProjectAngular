import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { map } from 'rxjs/operators';
import { PassYears } from 'src/models/PassYears';
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
  selector: 'app-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrls: ['./bank-statement.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class BankStatementComponent implements OnInit {
  Content :any;
  loading = false;
  passDate = true;
  acc_no: string;
  fromDate: Date;
  toDate: Date;
  filePath: string;
  fileType: string;
  yearList: PassYears[] = [];
  error = '';
  form = new FormGroup({
    accno: new FormControl('', Validators.required),
    years: new FormControl('',),
    fileType: new FormControl('pdf', Validators.required),
    fromDate: new FormControl('',),
    toDate: new FormControl('',),
  });
  sanitizer: any;
  constructor(private bankStatementAPIService: BankStatementService) { }

  ngOnInit() {
    this.loading = true;
    this.bankStatementAPIService.getYearsList().subscribe((res: PassYears[]) => {
      this.loading = false;
      this.yearList = res;
    });
  }
  passOnChange(isChecked: boolean) {
    if (isChecked) {
      this.passDate = isChecked;
    }
    else {
      this.passDate = isChecked;
    }
  }
  submit() {
    if (this.form.invalid) {
      this.error = "Account No is required";
      return;
    }
    this.loading = true;
    this.error = "";
    this.acc_no = this.form.get(["accno"])!.value;
    this.fileType = this.form.get(["fileType"])!.value;
    var appfiletype ='';
    if(this.fileType ==="excel"){
      appfiletype = "application/vnd.ms-excel";
    }
    else{
      appfiletype = "application/pdf";
    }
    if (this.passDate) {
      this.fromDate = this.form.get(["fromDate"])!.value;
      this.toDate = this.form.get(["toDate"])!.value;
      let fDate = `${this.fromDate.getFullYear()}-${this.fromDate.getMonth()+1}-${this.fromDate.getDate()}`;
      let tDate = `${this.toDate.getFullYear()}-${this.toDate.getMonth()+1}-${this.toDate.getDate()}`;
      this.bankStatementAPIService.createBankStatement(this.acc_no,this.fileType, fDate, tDate)
        .pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: appfiletype
            });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            if(this.fileType ==="excel"){
              link.download = 'BankStatememnt.xlsx';
              }else{
                link.target = '_blank';
                //this.Content=this.sanitizer.bypassSecurityTrustResourceUrl(link.href);
              }
         
            link.click();
            window.URL.revokeObjectURL(link.href);
            this.loading = false;
          })).subscribe(
            res => { },
            error => {
              this.error = this.acc_no + "(The system cannot find the file specified)";
              this.loading = false;
            });
   
    }
    else {
      this.filePath = this.form.get(["years"])!.value;
      if(this.filePath == ""){
        this.error = "Year is required";
        this.loading = false;
        return;
      }
      this.bankStatementAPIService.searchPassBankStatement(this.acc_no, this.filePath, this.fileType)
        .pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: appfiletype
            });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            if(this.fileType ==="excel"){
            link.download = 'BankStatememnt.xlsx';
            }else{
              link.target = '_blank';
            }
            
            link.click();
            window.URL.revokeObjectURL(link.href);
            this.loading = false;
          })).subscribe(
            res => {

            },
            error => {
              this.error = this.acc_no + "(The system cannot find the file specified)";
              this.loading = false;
            });

          }
  }

}
