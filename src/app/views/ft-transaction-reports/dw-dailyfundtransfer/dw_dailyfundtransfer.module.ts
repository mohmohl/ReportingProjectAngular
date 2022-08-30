import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWDailyFundTransferRoutingModule } from './dw_dailyfundtransfer-routing.module';
import { DwDailyfundtransferComponent } from './dw-dailyfundtransfer.component';

@NgModule({
  imports: [
    CommonModule,
    DWDailyFundTransferRoutingModule,
    SharedModule
  ],
  declarations: [DwDailyfundtransferComponent]
})
export class DWDailyFundTransferModule { }