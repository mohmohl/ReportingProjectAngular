import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MeterBillViewComponent } from './meter-bill-view.component';
import { MetreBillViewRoutingModule } from './metre-bill-view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MetreBillViewRoutingModule,
    SharedModule
  ],
  declarations: [MeterBillViewComponent]
})
export class MetreBillViewModule { }
