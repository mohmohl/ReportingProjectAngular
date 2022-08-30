import { Component, OnInit } from '@angular/core';
import { MeterBillResponse } from 'src/models/meterBill/MeterBillResponse';
import { MeterService } from 'src/services/MetreService';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delete-view',
  templateUrl: './delete-view.component.html',
  styleUrls: ['./delete-view.component.css']
})
export class DeleteViewComponent implements OnInit {

  loading = false;
  error = '';
  message = '';
  response: MeterBillResponse;

  constructor(private meterService: MeterService) { }

  ngOnInit() {
  }

  removeGovAll() {
    // console.log("Hello Gov remove")
      this.error = "";
      this.loading = true;
      this.meterService.deleteMeterBill()
      .pipe(
        map((data: any) => {
          this.response = data;
          this.loading = false;
          if(this.response){
            this.message = "Government MeterBill Clear Done !....";          
          } else {
            this.message = "Government MeterBill Clear Fail !....";  
          }
        }))
      .subscribe(res=>{
        
      },
      error => {
        this.error ="The system have the error";
        this.loading = false;
      });
  }

  removeVendorAll() {
    // console.log("Hello Vendor remove")
    this.error = "";
    this.loading = true;
    this.meterService.deleteVendorMeterBill()
    .pipe(
      map((data: any) => {
        this.response = data;
        this.loading = false;
        if(this.response){
          this.message = "Vendor MeterBill Clear Done !....";          
        } else {
          this.message = "Vendor MeterBill Clear Fail !....";  
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
