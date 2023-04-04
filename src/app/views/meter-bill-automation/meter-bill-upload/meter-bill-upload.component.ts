import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// tslint:disable-next-line:no-duplicate-imports
import { DatePipe } from '@angular/common';
import moment, { Moment } from 'moment';
import { MeterBillConfigHeader } from 'src/models/MeterBillConfigHeader';
import { MeterBillAutomationService } from 'src/services/MeterBillAutomationService';
import { MeterBillAutomationUploadData } from 'src/models/MeterBillAutomationUploadData';
import { MeterBillAutomationResponse } from 'src/models/MeterBillAutomationResponse';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM-YY',
  },
  display: {
    dateInput: 'MMM-YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'meter-bill-automation-upload',
  templateUrl: './meter-bill-upload.component.html',
  styleUrls: ['./meter-bill-upload.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class MeterBillUploadComponent implements OnInit {
  loading = false;
  error = '';
  message = '';

  editForm = new FormGroup({
    uploadMonth : new FormControl(moment()),
  });

  configHeaderList: MeterBillConfigHeader[];

  fileList: any [] = [];
  listOfFile: File[] =[];
  uploadDataList: MeterBillAutomationUploadData[] = [];;

  constructor(
    private service:MeterBillAutomationService,
    public datepipe: DatePipe
    ) { }

  ngOnInit() {
    this.loading = true;
    this.getAllConfig();
  }
 
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.editForm.get(["uploadMonth"])!.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.editForm.get(["uploadMonth"]).setValue(ctrlValue);
    datepicker.close();
  }
  
  getAllConfig() :void{
    this.service.getAllConfig().subscribe(
            (res :  MeterBillConfigHeader[]) => { 
              this.loading = false;
              this.configHeaderList = res;
              console.log(JSON.stringify(this.configHeaderList));
            },
            error => {
              this.loading = false;
            });
    }

    onConfigChange(event : any, i: any): void {
        console.log("Event Data" + event.target.value);
        this.fileList[i].configurationId = event.target.value;
     }

    getExtension(fileName: string): string {
      return fileName.substring(fileName.lastIndexOf('.'));
    }
  
    validateExtension(extension: string):boolean {
      extension = extension.toLowerCase();
      if (extension ===".xls" || extension ===".xlsx")
        return true;
      else return false;
    }

    checkFileFormat(event: any): boolean {
      var ret = true;
      for(let file of event.target.files){
        if(!this.validateExtension(this.getExtension(file.name))){
          ret = false;
          break;
        }
      }
      return ret;
    }

    checkFileNameFormat(event: any): string {
      var ret = '';
      for(let file of event.target.files){
        let nameList = file.name.split('_');
        if(nameList.length ===3){
            if(nameList[0].toUpperCase() !==  this.datepipe.transform(this.editForm.get(["uploadMonth"])!.value, 'MMMyy').toUpperCase()){
              ret = file.name +' is not a valid file name format. Upload Month is not valid.';
              break;
            }else if (nameList[1].length !== 8 || !nameList[1].startsWith('TSP')){
              ret = file.name +' is not a valid file name format. Township is not valid.';
            }
        }else {
          ret = file.name  +' is not a valid file name format.';
          break;
        }
      }
      return ret;
    }

    validateFileSize(event: any):boolean {
      var ret = true;
      var fileSize = 0;
      for(let file of event.target.files){
        fileSize = fileSize + file.size;
      }
      console.log ("File Size_________" + fileSize);
      if((fileSize/1048576) < 50)
          return true;
      else return false;
    }

    selectFiles(event: any) :void {
      this.error = "";
      if(!this.checkFileFormat(event)){
          this.error = "Invalid File Format. System only accepts Excel Files";
      }
     /*  else if (!this.validateFileSize(event)){
        this.error = "Invalid File Size. System only accepts 50MB for total file size";
      } */
      else{
        let checkedFileError = this.checkFileNameFormat(event); 
        if(checkedFileError !==''){
          this.error = checkedFileError;
        }else{
          for(let file of event.target.files){
            let existFile = false;
            for(let data of this.fileList){
              if(data.fileName === file.name){
                existFile = true;
              }
            }
            if(!existFile) {
              let nameList = file.name.split('_');
              this.fileList.push(
                {
                  "month":nameList[0],
                  "township":nameList[1],
                  "version":nameList[2].substring(0,nameList[2].lastIndexOf('.')),
                  "fileName":file.name,
                  "configurationId":this.configHeaderList[0].id,
                  "file":file
              });
            }
          }
        }
      } 
    }

    removeFile(index) :void {
      if (index !== -1) {
        this.fileList.splice(index, 1);
      } 
    }

    uploadFile() :void {
      this.loading = true;
      this.error = "";
      this.message = "";

      this.listOfFile =[];
      this.uploadDataList = [];
       for(let data of this.fileList){
        this.listOfFile.push(data.file);
        this.uploadDataList.push(
          {
            "month":data.month,
            "township":data.township,
            "version":data.version,
            "fileName":data.fileName,
            "configurationId":data.configurationId,
          }
        );
      }

      //var userId = this.authService.currentUserValue.userId;

      this.service.uploadFile(this.listOfFile, this.uploadDataList).subscribe(
              (res :  MeterBillAutomationResponse) => { 
                this.loading = false;
                if(res.msgCode === '0000'){
                  this.error = "";
                  this.message = "Upload Successfully."
                }else {
                  this.message = "";
                  this.error = res.msgDesc;
                }
                
              },
              (error) => {
                this.loading = false;
                this.message = "";
                this.error = "Cannot Upload!";
              });
    }
 
    /* clearForm() :void {
      //this.editForm.controls['branch'].setValue('');
      this.editForm.controls['category'].setValue('');
      this.editForm.controls['accountNo'].setValue('');
      this.fileList =[];
    } */
} 
