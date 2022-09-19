import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWDomesticsFundTransferRoutingModule } from './dw_domesticsfundtransfer-routing.module';
import { DwDomesticsfundtransferComponent } from './dw-domesticsfundtransfer.component';

@NgModule({
  imports: [
    CommonModule,
    DWDomesticsFundTransferRoutingModule,
    SharedModule
  ],
  declarations: [DwDomesticsfundtransferComponent]
})
export class DWDomesticsFundTransferModule { }