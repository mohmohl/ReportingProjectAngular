import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { PassYears } from 'src/models/PassYears';
import { SearchPDFService } from 'src/services/BankStatementService';

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
  yearList: PassYears[] = [];
  error = '';
  form = new FormGroup({
    accno: new FormControl('', Validators.required),
    years: new FormControl('',),
    fromDate: new FormControl('',),
    toDate: new FormControl('',),
  });
  constructor(private pdfAPIService: SearchPDFService) { }

  ngOnInit() {
    this.pdfAPIService.getYearsList().subscribe((res: PassYears[]) => {
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
    if (this.passDate) {
      this.filePath = this.form.get(["years"])!.value;
      this.pdfAPIService.searchPassBankStatement(this.acc_no, this.filePath)
        .pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: 'application/pdf'
            });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            // link.download = 'samplePDFFile.pdf';
            link.target = '_blank';
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
    else {
      this.fromDate = this.form.get(["fromDate"])!.value;
      this.toDate = this.form.get(["toDate"])!.value;
      this.pdfAPIService.createBankStatement(this.acc_no, this.fromDate, this.toDate)
        .pipe(
          map((data: any) => {
            let blob = new Blob([data], {
              type: 'application/pdf'
            });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            // link.download = 'samplePDFFile.pdf';
            link.target = '_blank';
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
    /*
    this.pdfAPIService.searchPassBankStatement(this.acc_no)
    .pipe(
      map((data: any) => {
      let blob = new Blob([data], {
          type: 'application/pdf' 
      });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      // link.download = 'samplePDFFile.pdf';
      link.target = '_blank';
      link.click();
      window.URL.revokeObjectURL(link.href);
      this.loading = false;
  })).subscribe(
    res=>{
  
    },
        error => {
          this.error = this.acc_no+ "(The system cannot find the file specified)";
          this.loading = false;
          });*/
  }

}