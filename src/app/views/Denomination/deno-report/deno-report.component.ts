import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { map } from 'rxjs/operators';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { DenominationService } from 'src/services/DenominationService';
import { PICK_FORMATS } from '../deno-import/deno-import.component';

@Component({
  selector: 'app-deno-report',
  templateUrl: './deno-report.component.html',
  styleUrls: ['./deno-report.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
]
})
export class DenoReportComponent implements OnInit {
  error='';
  Importdate:Date;
  loading = false;
  maxDate = new Date();
  form = new FormGroup({
    import_date: new FormControl(new Date,)
  });
  constructor(private denoService: DenominationService) { }

  ngOnInit() {
  }
  submit(){
    if (this.form.invalid) {
      this.form.getError
      this.error = "Data is required >>"+ this.form.getError;
      return;
  }
  this.error="";
  this.Importdate = this.form.get(["import_date"])!.value;
  this.loading = true;
  let ImDate = `${this.Importdate.getFullYear()}-${this.Importdate.getMonth()+1}-${this.Importdate.getDate()}`;

  this.denoService.exportExcel(ImDate)
  .pipe(
    map((data: any) => {
      debugger;
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'CMD_DT_01_'+ImDate+'.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("CMD_DT_01 Error >>> "+error)
        debugger;
        if(error != ""){
        this.error = "(The system cannot generate CMD_DT_01!.. Have the error)";
          }
        this.loading = false;
      });
  }


}
