import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SearchPDFService } from 'src/services/SearchPDFService';

@Component({
  selector: 'app-search-pdf',
  templateUrl: './search-pdf.component.html',
  styleUrls: ['./search-pdf.component.css']
})
export class SearchPDFComponent implements OnInit {
  loading = false;
  acc_no: string;
  error = '';
  form = new FormGroup({
    accno: new FormControl('', Validators.required)
  });
  constructor(private pdfAPIService: SearchPDFService) { }

  ngOnInit() {
  }
  
  submit() {
    if (this.form.invalid) {
      this.error = "Account No is required";
      return;
    }
    this.error = "";
    this.acc_no = this.form.get(["accno"])!.value;
    this.loading = true;
    this.pdfAPIService.searchAccount(this.acc_no)
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

}
