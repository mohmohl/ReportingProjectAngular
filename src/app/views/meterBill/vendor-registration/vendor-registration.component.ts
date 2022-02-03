import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendor } from 'src/models/meterBill/Vendor';
import { MeterService } from 'src/services/MetreService';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit {
  loading = false;
  error='';
  successMsg=''
  divisionList: any=[];

  form = new FormGroup({
    vendorName: new FormControl('',Validators.required),
    divisionId: new FormControl('',Validators.required)
  });

  constructor(private meterService: MeterService) { 

    this.meterService.getDivisions().subscribe(res =>{
      this.loading = false;
        if(res){
        this.divisionList = res;
        }
      });

  }

  ngOnInit(): void {
  }

  submit(){
    if (this.form.invalid) {
      this.error = "Data is required";
      return;
  }
  this.error="";
  this.loading = true;

  const vendor = new Vendor();
  vendor.vendorName = this.form.get(["vendorName"])!.value
  vendor.divisionId = this.form.get(["divisionId"])!.value

  this.meterService.saveVendor(vendor).subscribe(res =>{
  this.loading = false;
  if(res){
  this.successMsg = "Saved Successful!..."
  }
  else{
    this.error="Saved Fail"
  }
  });
}

}
