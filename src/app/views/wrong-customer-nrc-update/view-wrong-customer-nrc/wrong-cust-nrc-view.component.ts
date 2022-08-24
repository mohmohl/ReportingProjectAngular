import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { WrongCustomerNrcService } from 'src/services/WrongCustomerNrcService';
import { BranchData } from 'src/models/BranchData';
import * as fileSaver from 'file-saver';
import { map } from 'rxjs/operators';

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
  selector: 'app-wrong-cust-nrc-view',
  templateUrl: './wrong-cust-nrc-view.component.html',
  styleUrls: ['./wrong-cust-nrc-view.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class WrongCustomerNRCViewComponent implements OnInit {
  loading = false;
  error = '';
  message = '';

  editForm = new FormGroup({
    branch: new FormControl('', Validators.required),
  });

  branchList: BranchData[];

  constructor(
    private service:WrongCustomerNrcService,
    ) { }

  ngOnInit() {
    this.loading = true;
    this.getAllBranchList();
  }
 
  getAllBranchList() :void{
    this.service.getAllBranchList().subscribe(
            (res :  BranchData[]) => { 
              this.loading = false;
              this.branchList = res;
            },
            error => {
              this.loading = false;
     });
    }
  
    /*
    clearForm() :void {
      //this.editForm.controls['branch'].setValue('');
      this.editForm.controls['category'].setValue('');
      this.editForm.controls['accountNo'].setValue('');
      this.fileList =[];
    }
    */

   saveFile(data: any, fileName?: string,fileType?: string):void {
    const blob = new Blob([data], {type: fileType});
    fileSaver.saveAs(blob, fileName);
  }

  download(){
    this.loading = true;
    this.error ="";
    this.message = "";
    var branchCode = "";
    if(this.editForm.get(["branch"])!.value ==='0'){
      branchCode = 'ALL';
    }else {
      branchCode = this.editForm.get(["branch"])!.value;
    }
    this.service.download(branchCode).pipe(
        map((res: any) => {
          this.saveFile(res, branchCode +"_wrong_nrc.xlsx", 'application/vnd.ms-excel');          
          this.loading = false;
        })).subscribe(
          res => {this.loading = false; },
          error => {
            this.error ="The system cannot find the file path specified";
            this.loading = false;
          });
  }
} 
