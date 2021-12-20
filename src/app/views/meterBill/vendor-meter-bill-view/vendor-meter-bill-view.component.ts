import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MeterService } from 'src/services/MetreService';

@Component({
  selector: 'app-vendor-meter-bill-view',
  templateUrl: './vendor-meter-bill-view.component.html',
  styleUrls: ['./vendor-meter-bill-view.component.css']
})
export class VendorMeterBillViewComponent implements OnInit {
  loading = false;
  error='';
  successMsg=''
  divisionList: any=[];
  uploadedList: any=[];

  form = new FormGroup({
    divisionId: new FormControl('')
  });

  constructor(private meterService: MeterService) { 
    
    this.meterService.getDivisions().subscribe(res =>{
      this.loading = false;
        if(res){
        this.divisionList = res;
        }
      });
  }

  ngOnInit() {}

  submit() {
    this.uploadedList = [];
    this.loading = true;
    let divisionId = this.form.get(["divisionId"])!.value
    this.meterService.getUploadedVendorMeterBill(divisionId).subscribe(res =>{
        this.loading = false;
          if(res != null){
            this.uploadedList = res;
          }
        });
  }

  clear(vendorId: string) {
    this.loading = true
    let divisionId = this.form.get(["divisionId"])!.value

    this.meterService.deleteUploadedVendorMeterBill(vendorId).subscribe(res =>{
      this.loading = false;
        if(res){
          this.successMsg = "Deleted Successfully..."
          this.meterService.getUploadedVendorMeterBill(divisionId).subscribe(res =>{
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
