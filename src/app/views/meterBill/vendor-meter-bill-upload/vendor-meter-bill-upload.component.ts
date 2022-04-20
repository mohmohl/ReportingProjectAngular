import { Component, OnInit } from '@angular/core';
import { MeterBillResponse } from 'src/models/meterBill/MeterBillResponse';
import { MeterService } from 'src/services/MetreService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { MeterBill_Error } from 'src/models/meterBill/MeterBill_Error';

@Component({
  selector: 'app-vendor-meter-bill-upload',
  templateUrl: './vendor-meter-bill-upload.component.html',
  styleUrls: ['./vendor-meter-bill-upload.component.css']
})
export class VendorMeterBillUploadComponent {
  loading = false;
  error = '';
  message = '';
  vendorList: any;
  clearFlag = false;
  errorList: MeterBill_Error[];
  uploadedFileName;
  progress=0;
  
  fileToUpload: File | null = null;
  response: MeterBillResponse;
  totalCount = 0;
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
  
  constructor(private meterService: MeterService) {
    this.loading = true;
    this.meterService.getVendors().subscribe(res =>{
      this.loading = false;
        if(res){
          this.vendorList = res;
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

   form = new FormGroup({
     fileData: new FormControl('', Validators.required),
     vendorId: new FormControl('', Validators.required)
   });
 
   reChange(){
     this.error = '';
        // this.form = new FormGroup({
        //  fileData: new FormControl('', Validators.required),
        //   vendorId: new FormControl(this.form.get(["vendorId"])!.value)
        // });
   
   }
 
   handleFileInput(files: FileList) {
    this.uploadedFileName = files[0].name
     this.error = '';
     if (!this.validateFile(files[0].name)) {
       this.error = files[0].name + ' file format is not supported';
      //  this.form = new FormGroup({
      //   fileData: new FormControl('', Validators.required),
      //    vendorId: new FormControl(this.form.get(["vendorId"])!.value)
      //  });
       return false;
     }
     this.fileToUpload = files.item(0);
     console.log("File to upload" + this.fileToUpload)
   }
 
   validateFile(name: String) {
     var ext = name.substring(name.lastIndexOf('.') + 1);
     if (ext.toLowerCase() == 'xlsx') {
       return true;
     }
     else {
       return false;
     }
   }
 
   submit() {
     if (this.form.invalid) {
       this.error = "Data is required";
       return;
     }
 
   this.loading = true;
	 //this.timeStart();
   this.errorList = [];
	 this.error = "";
   this.message = "";
   this.progress = 0;
     const formData = new FormData();
     let vendor = this.form.get(["vendorId"])!.value;
     formData.append("vendor_id",vendor)
     formData.append("fileName",this.uploadedFileName)
     formData.append("file", this.fileToUpload);
     debugger
     this.meterService.oneFileUpload(formData)
     .pipe(
       map((data: any) => {
        debugger
        this.subscription.unsubscribe();
         this.response = data;
         this.loading = false;
         if(this.response != null){
           if(this.response.flag == false){
            this.message = "Import Done !....";
            this.subscription.unsubscribe();
            this.progress=100;
              // if(this.response.totalCount >0){
              //   this.totalCount = this.response.totalCount;
              //   this.message = "Import Done !....";
              // }else{
              //   this.message = "Import Fail !....";
              // }
           }else{
            this.subscription.unsubscribe();
            this.progress=0;
            this.message = this.response.message;
           }
           this.errorList = this.response.errorList;
         }
         this.subscription.unsubscribe();
         this.progress=0;
       }))
     .subscribe(res=>{
     },
     error => {
       this.error ="The system have the error";
       this.loading = false;
       this.subscription.unsubscribe();
     });

     this.progessbar_loadingCount(vendor); 
 }

 progessbar_loadingCount(vendor:string){
  this.subscription = interval(1000)
         .subscribe(x => { this.meterService.get_vendor_upload_progress(vendor).subscribe(res=>{
          this.progress=res;
          if( this.progress == 100){
            this.subscription.unsubscribe();
          }
        },
        error => {
          this.progress=0;
           this.error = "Progress Error";
           this.subscription.unsubscribe();
        }
        ); });
 }

 removeAll() {
  this.error = "";
  this.loading = true;
  this.meterService.deleteVendorMeterBill()
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

}
