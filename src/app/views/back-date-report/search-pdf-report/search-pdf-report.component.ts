import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackDateReportService } from 'src/services/BackDateReportService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { map } from 'rxjs/operators';
import { PickDateAdapter } from 'src/models/PickDateAdapter';

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
  selector: 'app-search-pdf-report',
  templateUrl: './search-pdf-report.component.html',
  styleUrls: ['./search-pdf-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})

export class SearchPdfReportComponent implements OnInit {
  paramId:any;
  branch_list:string[];
  ccy_list:string[];
  loading = false;
  date: Date;
  branch: string;
  fileName: string;
  error = '';

  form = new FormGroup({
    branch: new FormControl('',Validators.required),
    date: new FormControl(new Date,),
    currency: new FormControl('',Validators.required),
  });

  constructor(private route: ActivatedRoute,private bdService:BackDateReportService) { }

  ngOnInit() {
    this.bdService.getBranchList().subscribe(res =>{
      this.branch_list=res;
    });

    this.bdService.getCurrencyList().subscribe(res =>{
      this.ccy_list=res;
    });

  }

  submit() {
    if (this.form.invalid) {
      this.error = "Branch is required";
      return;
    }
    this.loading = true;
    this.error = "";
    this.branch = this.form.get(["branch"])!.value;
    this.date = this.form.get(["date"])!.value;
    

    this.paramId = this.route.snapshot.data;
    this.fileName = this.paramId.param + "_" + this.form.get(["currency"])!.value + ".pdf";


    var appfiletype ="application/pdf";
    let searchDate = `${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`;
    console.log("Search date: " + searchDate);

    this.bdService.searchBackDateTrial(this.branch,searchDate, this.fileName)
      .pipe(
        
        map((data: any) => {
          debugger
          let blob = new Blob([data], {
            type: appfiletype
          });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          document.body.appendChild(a);
          var file = new Blob([data], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          a.href = fileURL;
          a.target      = '_blank'; 
          a.click();

          this.loading = false;
        })).subscribe(
          res => {

          },
          error => {
            this.error =  "Branch Code - " + this.branch + " File - " + this.fileName  + "(The system cannot find the file specified)";
            this.loading = false;
          });



  }




}
