import { Component, OnInit } from '@angular/core';
import { MeterService } from 'src/services/MetreService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Meter_Report } from 'src/models/meterBill/Meter_Report';
import { Meter_ReportResponse } from 'src/models/meterBill/Meter_ReportResponse';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent {

  loading = false;
  error = '';
  message = '';
  regionList: any;
  townshipList: any;
  vendorList: any;
  divisionList: any;
  response: Meter_ReportResponse[];
  divisionId: any;
  regionId: any;
  townshipId: any;
  vendorId: any;
  searchData: any;
  
  form = new FormGroup({
    divisionId: new FormControl(''),
    regionId: new FormControl(''),
    townshipId: new FormControl(''),
    vendorId: new FormControl(''),
    searchData: new FormControl('')
  });

  constructor(private metreService: MeterService, public datepipe: DatePipe) { 
    this.loading = true;
    this.metreService.getVendors().subscribe(res =>{
      this.loading = false;
        if(res){
          this.vendorList = res;
        }
      });
     
     this.metreService.getDivisions().subscribe(res =>{
        this.loading = false;
          if(res){
            this.divisionList = res;
          }
        });
  }

  onChange(event: any){
    this.loading = true;
    var value = event.target.value;
    this.metreService.getRegionsById(value).subscribe(res =>{
      this.loading = false;
      this.regionList = [];
      this.townshipList=[];
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
          this.townshipList.push({townshipId:"0",townshipName:"All"});
          res.forEach((item, index, res) => {
            this.townshipList.push(item);
          });
         //this.townshipList = res;
        }
      });
   }

   submit() {
    this.loading = true;
    const reqReport = new Meter_Report();
    reqReport.regionId = this.form.get(["regionId"])!.value
    reqReport.divisionId = this.form.get(["divisionId"])!.value
    reqReport.townshipId = this.form.get(["townshipId"])!.value
    reqReport.vendorId = this.form.get(['vendorId'])!.value
    reqReport.searchData = this.form.get(['searchData'])!.value

    this.metreService.viewReport(reqReport)
          .pipe(
            map((res: any) => {
              this.loading = false;
              if(res!= null){
                this.response = res;
              }
            }))
          .subscribe(res=>{
            
          },
          error => {
            this.error ="The system have the error";
            this.loading = false;
          });



   }

   exportexcel(): void 
  {
     if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.loading = true; 
  this.divisionId = this.form.get(["divisionId"])!.value
  this.regionId = this.form.get(["regionId"])!.value
  this.townshipId = this.form.get(["townshipId"])!.value
  this.vendorId = this.form.get(['vendorId'])!.value
  this.searchData = this.form.get(['searchData'])!.value

  this.metreService.exportExcel(this.divisionId,this.vendorId,this.regionId, this.townshipId,this.searchData)
  .pipe(
    map((data: any) => {
      let blob = new Blob([data], {
        type: "application/vnd.ms-excel"
      });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'MeterBill_' + this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss') +'.xlsx';
        link.click();
        window.URL.revokeObjectURL(link.href);
      
      this.loading = false;
    })).subscribe(
      res => { },
      error => {
        console.log("MeterBill Error >>> "+error)
        if(error != ""){
        this.error = "(The system cannot generate meter bill report!.. Have the error)";
          }
        this.loading = false;
      });
  }


}
