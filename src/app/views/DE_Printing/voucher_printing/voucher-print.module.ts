import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { VoucherPrintComponent } from './voucher-print.component';
import { VoucherPrintRoutingModule } from './voucher-print-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VoucherPrintRoutingModule,
    SharedModule
  ],
  declarations: [VoucherPrintComponent]
})
export class VoucherPrintModule { }
