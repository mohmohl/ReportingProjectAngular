import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PassYears } from 'src/models/PassYears';
import { BankStatementService } from 'src/services/BankStatementService';

@Component({
  selector: 'app-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrls: ['./bank-statement.component.css']
})
export class BankStatementComponent implements OnInit {
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
      this.bankStatementAPIService.createBankStatement(this.acc_no,this.fileType, this.fromDate, this.toDate)
        .pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: 'application/pdf'
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
