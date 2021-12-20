import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MeterService } from 'src/services/MetreService';

@Component({
  selector: 'app-meter-bill-view',
  templateUrl: './meter-bill-view.component.html',
  styleUrls: ['./meter-bill-view.component.css']
})
export class MeterBillViewComponent implements OnInit {

  loading = false;
  error='';
  msg=''
  regionList: any=[];
  uploadedList: any = [];

  form = new FormGroup({
    regionId: new FormControl('')
  });

  constructor(private meterService: MeterService) { 
    this.loading = true;
    this.meterService.getRegions().subscribe(res =>{
      this.loading = false;
        if(res){
        this.regionList = res;
        }
      });
  }

  ngOnInit() {}

 

  submit() {
    this.uploadedList = [];
    this.loading = true;
    let regionId = this.form.get(["regionId"])!.value
    this.meterService.getUploadedMeterBill(regionId).subscribe(res =>{
        this.loading = false;
          if(res != null){
            this.uploadedList = res;
          }
        });
  }

  clear(townshipId: string) {
    this.loading = true
    let regionId = this.form.get(["regionId"])!.value
    this.meterService.deleteUploadedMeterBill(townshipId).subscribe(res =>{
      this.loading = false;
        if(res){
          this.msg = "Deleted Successfully..."
          this.meterService.getUploadedMeterBill(regionId).subscribe(res =>{
              if(res != null){
                this.uploadedList = res;
              } else {
                this.uploadedList = [];
              }
            });
        }
      });
  }
  

}
