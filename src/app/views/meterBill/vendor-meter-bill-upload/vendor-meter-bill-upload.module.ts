import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorMetreBillUploadRoutingModule } from './vendor-meter-bill-upload-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { VendorMeterBillUploadComponent } from './vendor-meter-bill-upload.component';

@NgModule({
  imports: [
    CommonModule,
    VendorMetreBillUploadRoutingModule,
    SharedModule
  ],
  declarations: [VendorMeterBillUploadComponent]
})
export class VendorMetreBillUploadModule { }
