import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeterService } from 'src/services/MetreService';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx'; 
import { MeterBillResponse } from 'src/models/meterBill/MeterBillResponse';import { interval } from 'rxjs';
import { MeterBill_Error } from 'src/models/meterBill/MeterBill_Error';

@Component({
  selector: 'app-metre-bill-upload',
  templateUrl: './metre-bill-upload.component.html',
  styleUrls: ['./metre-bill-upload.component.css']
})

export class MetreBillUploadComponent implements OnInit {
  loading = false;
  error = '';
  message = '';
  progress=0;
  fileToUpload: File | null = null;
  response: MeterBillResponse;
  totalCount = 0;
  errorList:MeterBill_Error[];
  regionList: any=[];
  tspList: any=[];
  divisionList: any=[];
  tspId: any;
  uploadedFileName;
 // isDisabled = false;
 storeData: any;   
 worksheet: any; 
 excel_row_count=0;
  timeCounter='';
  totalHours = 216000;
   totalMinutes = 3600;
   totalSeconds = 0;
   h_index = 0;
   m_index = 0;
    public secondsToDday;
    public minutesToDday;
    public hoursToDday;
    subscription: any;
    //progress_subscription : any;
townshipMultiFile =new FormData();
  form = new FormGroup({
    fileData: new FormControl('', Validators.required),
    template: new FormControl(''),
    divisionId: new FormControl('', Validators.required),
    regionId: new FormControl('', Validators.required),
    townshipId: new FormControl('', Validators.required)
  });

  constructor(private metreService: MeterService) {
   
    this.loading = true;
    this.metreService.getRegions().subscribe(res =>{
      this.loading = false;
        if(res){
          this.regionList.push({regionId:"0",regionName:"Choose Region"});
          res.forEach((item, index, res) => {
            this.regionList.push(item);
          }); 
        }
      });

    this.metreService.getDivisions().subscribe(res =>{
        this.loading = false;
          if(res){
          this.divisionList = res;
          }
        });

}

timeStart(){
  this.totalHours = 216000;
  this.totalMinutes = 3600;
  this.totalSeconds = 0;
  
  this.subscription = interval(1000)
         .subscribe(x => { this.getTimeDifference(); });
 }

private getTimeDifference () {
 var hour = 0;
 var minutes = 0;
 var seconds = 0;
  ++this.totalSeconds;
  ++this.m_index;
  if(this.m_index == 60 ){
        ++this.totalMinutes;
        this.m_index = 0
        ++this.h_index; 
      }
  if(this.h_index == 60 ){
        ++this.totalHours;
        this.h_index = 0
      }
    this.hoursToDday = this.totalHours % 216000;
    this.minutesToDday =this.totalMinutes % 3600;
    this.secondsToDday = this.totalSeconds % 60;
    this.timeCounter= this.hoursToDday+" Hrs "+this.minutesToDday+" Min "+this.secondsToDday+" S"
}
 
onChange(event: any){
  this.loading = true;
  var value = event.target.value;
  this.metreService.getRegionsById(value).subscribe(res =>{
    this.loading = false;
    this.regionList = [];
    this.tspList=[];
      if(res.length == 0){
        this.regionList.push({regionId:"0",regionName:"No data"});
      } else {        
        this.regionList.push({regionId:"0",regionName:"Choose Region"});
          res.forEach((item, index, res) => {
            this.regionList.push(item);
          });
      }
    });
 }

 onRegionChange(event: any) {
  this.loading = true;
  var value = event.target.value;
  this.metreService.getTownships(value).subscribe(res =>{
    this.loading = false;
       if(res){
        this.tspList = res;
      }
    });
 }    
  
  ngOnInit(): void {
  }

  reChange(){
    this.error = '';
    this.message = '';
  }

  handleFileInput(files: FileList) {
    this.uploadedFileName = files[0].name
    this.error = '';
    if (!this.validateFile(files[0].name)) {
      this.error = files[0].name + ' file format is not supported';
      return false;
    }
    // console.log("excel file size= "+files.item(0))
    this.fileToUpload = files.item(0);
    //this.readExcel()
  }

 /*
  readExcel() {  
    let readFile = new FileReader(); 
    readFile.onload = (e) => {  
      this.storeData = readFile.result;  
      var data = new Uint8Array(this.storeData);  
      var arr = new Array(); 
      for (var i = 0; i != data.length; ++i) 
      arr[i] = String.fromCharCode(data[i]);  
      var bstr = arr.join("");  
      var workbook = XLSX.read(bstr, { type: "binary" });  
      var first_sheet_name = workbook.SheetNames[0];  
      this.worksheet = workbook.Sheets[first_sheet_name];  
      var range = XLSX.utils.decode_range(this.worksheet['!ref']);
      this.excel_row_count=range.e.r;

    }  
   
    readFile.readAsArrayBuffer(this.fileToUpload);          
  }
  */

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xlsx' || ext.toLowerCase() == 'xls') {
      return true;
    }
    else {
      return false;
    }
  }

  submit() {
    //this.isDisabled = true;
    debugger
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    //console.log("TspID :" +  this.form.get(["townshipId"])!.value)
    this.loading = true;
    this.errorList = [];
    this.timeStart();
    this.error = "";    
   this.message = "";
   this.progress=0;
    const formData = new FormData();
    let divi=this.form.get(["divisionId"])!.value;
    let region = this.form.get(["regionId"])!.value;
    let township = this.form.get(["townshipId"])!.value;
    formData.append("division_id",divi)
    formData.append("region_id",region)
    formData.append("township_id",township)
    formData.append("template", this.uploadedFileName)
    formData.append("file", this.fileToUpload);
    this.metreService.fileUpload(formData) 
    .pipe(
      map((data: any) => {
        this.form.reset();
        this.subscription.unsubscribe();
        this.response = data;
        this.loading = false;
       // this.isDisabled = false;
        if(this.response != null){
          if(this.response.flag == false){
            this.errorList = this.response.errorList;
            if(this.errorList != null && this.errorList.length >0) {
              this.message = "See below duplicate items!....";
            } else {
              if(this.response.totalCount >0){
                this.totalCount = this.response.totalCount;
                this.subscription.unsubscribe();
                //this.progress_subscription.unsubscribe();
                this.progress=100;
                console.log("upload finish = "+ this.progress);
                this.message = this.totalCount + " Import Done!....";
              }else{
                this.subscription.unsubscribe();
                this.progress=0;
                this.message = "Import Fail !....";
              }
            }
          }else{
            this.subscription.unsubscribe();
            this.progress=0;
            this.message = this.response.message;
          }
          
        }
        this.subscription.unsubscribe();
        this.progress=0;
      }))
    .subscribe(res=>{
      this.loading = false;
    },
    error => {
      this.form.reset();
      this.subscription.unsubscribe();
      this.error ="The system have the error";
      this.loading = false;
    });
    
   //this.progessbar_loadingCount(this.excel_row_count,divi,region,township); 
  }

  /*
  removeAll() {
    this.error = "";
    this.loading = true;
    this.metreService.deleteMeterBill()
    .pipe(
      map((data: any) => {
        this.response = data;
        this.loading = false;
        if(this.response){
          this.message = "Clear Done !....";          
        } else {
          this.message = "Clear Fail !....";  
        }
      }))
    .subscribe(res=>{
      
    },
    error => {
      this.error ="The system have the error";
      this.loading = false;
    });
  }
  

  progessbar_loadingCount(data_count:number,divi:string,region:string,township:string){
    this.progress_subscription = interval(1000)
           .subscribe(x => { 
             if(data_count != 0){
             this.metreService.get_meter_upload_progress(data_count,divi,region,township).subscribe(res=>{
            this.progress=res;
            console.log("progress percentage = "+ this.progress);
            if( this.progress == 100){
              this.progress_subscription.unsubscribe();
            }
          },
          error => {
            this.progress=0;
             this.error = "Progress Error";
             this.progress_subscription.unsubscribe();
          }
          );
        }else{this.progress=0;}
        
        });
   }
*/

}