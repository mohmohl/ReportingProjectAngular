import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { VendorMeterBillViewComponent } from './vendor-meter-bill-view.component';
import { VendorMetreBillViewRoutingModule } from './vendor-meter-bill-view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VendorMetreBillViewRoutingModule,
    SharedModule
  ],
  declarations: [VendorMeterBillViewComponent]
})
export class VendorMetreBillViewModule { }
