import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetreService } from 'src/services/MetreService';
import { map } from 'rxjs/operators';
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
  fileToUpload: File | null = null;
  response: MeterBillResponse;
  totalCount = 0;
  errorList:MeterBill_Error[];
  regionList: any=[];
  tspList: any=[];
  divisionList: any=[];
  tspId: any;
 // isDisabled = false;
  
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
townshipMultiFile =new FormData();
  form = new FormGroup({
    fileData: new FormControl('', Validators.required),
    template: new FormControl(''),
    divisionId: new FormControl('', Validators.required),
    regionId: new FormControl('', Validators.required),
    townshipId: new FormControl('', Validators.required)
  });

  constructor(private metreService: MetreService) {
   
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
    this.error = '';
    if (!this.validateFile(files[0].name)) {
      this.error = files[0].name + ' file format is not supported';
      return false;
    }
    this.fileToUpload = files.item(0);
  }

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
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
    }
    //console.log("TspID :" +  this.form.get(["townshipId"])!.value)
    this.loading = true;
    this.timeStart();
    this.error = "";    
   this.message = "";

    const formData = new FormData();
    formData.append("division_id",this.form.get(["divisionId"])!.value)
    formData.append("region_id",this.form.get(["regionId"])!.value)
    formData.append("township_id",this.form.get(["townshipId"])!.value)
    formData.append("template", this.form.get(["template"])!.value)
    formData.append("file", this.fileToUpload);
    this.metreService.fileUpload(formData) 
    .pipe(
      map((data: any) => {
        this.response = data;
        this.loading = false;
       // this.isDisabled = false;
        if(this.response != null){
          if(this.response.flag == false){
            if(this.response.totalCount >0){
              this.totalCount = this.response.totalCount;
              this.message = this.totalCount + " Import Done!....";
            }else{
              this.message = "Import Fail !....";
            }
          }else{
            this.message = this.response.message;
          }
          
          this.errorList = this.response.errorList;
        }
        this.subscription.unsubscribe();
      }))
    .subscribe(res=>{
      
    },
    error => {
      this.subscription.unsubscribe();
      this.error ="The system have the error";
      this.loading = false;
    });
  }

}
