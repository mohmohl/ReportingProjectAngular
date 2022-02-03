import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { PickDateAdapter } from 'src/models/PickDateAdapter';
import { MMCBDataUploadService } from 'src/services/MMCBDataUploadService';
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
  selector: 'app-mmcb-data-upload',
  templateUrl: './mmcb-data-upload.component.html',
  styleUrls: ['./mmcb-data-upload.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class MMCBDataUploadComponent implements OnInit {
  loading = false;
  error = '';
  cmsLossFile: File | null = null;
  subscription: any;
  response:any;

  editForm = new FormGroup({
    checkDate: new FormControl('', Validators.required),
    asOfDate: new FormControl('', Validators.required),
    firstDayOfMonth: new FormControl('',),
    cycleDate: new FormControl('',),
    lastDayOfMonth: new FormControl('',),
    monthEndDate: new FormControl('',),
    cmsChk1: new FormControl('',),
    flexcubeChk1: new FormControl('',),
    flexcubeChk2: new FormControl('',),
    cmsLossFilePath: new FormControl('',),
    cmsFinalFilePath: new FormControl('',),
    flexcubeLossFilePath: new FormControl('',),
    flexcubeFinalFilePath: new FormControl('',),
  });
  constructor(private service:MMCBDataUploadService) { }

  ngOnInit() {
    this.loading = true;
    
  }
  passOnChange(isChecked: boolean) {
    
  }

  onUploadCMSLossData(event :any) :void {
    this.error = '';
    this.editForm.controls['cmsLossFilePath'].setValue('');
    const file = event.target.files[0] as File;
    if (file===null || file === undefined){
      //this.frontNrcUrl = null;
      this.error = 'Invalid File.'
    }else {
      const extension = this.getExtension(file.name);
    if(this.validateExtension(extension)){
      //this.cmsLossFile = file;
      this.editForm.controls['cmsLossFilePath'].setValue(file.name);
      
    }else{
      this.error = file.name + ' file format is not supported';
      //this.frontNrcUrl = null;
      //this.invalidFrontNrc = true;
    }
    }
  }

  uploadCMSLossFile(file:any) :void{
    const formData = new FormData();
    formData.append("vendor_id",this.editForm.get(["asOfDate"])!.value)
    formData.append("file_name",file.name);
    formData.append("file", file);

    this.service.uploadCMSLossFile(formData)
     .pipe(
       map((data: any) => {
        this.subscription.unsubscribe();
         this.response = data;
         this.loading = false;
         if(this.response != null){
           if(this.response.flag == false){
            //this.message = "Import Done !....";
              // if(this.response.totalCount >0){
              //   this.totalCount = this.response.totalCount;
              //   this.message = "Import Done !....";
              // }else{
              //   this.message = "Import Fail !....";
              // }
           }else{
            // this.message = this.response.message;
           }
           //this.errorList = this.response.errorList;
         }
         
       }))
     .subscribe(res=>{
     },
     error => {
       this.error ="The system have the error";
       this.loading = false;
       this.subscription.unsubscribe();
     });
  }

  getExtension(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.'));
  }

  validateExtension(extension: string):boolean {
    extension = extension.toLowerCase();
    if (extension ===".xlsx")
      return true;
    else return false;
  }
 

}
