import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWOBREncashTransferRoutingModule } from './dw_obrencashtransfer-routing.module';
import { DwObrencashtransferComponent } from './dw-obrencashtransfer.component';

@NgModule({
  imports: [
    CommonModule,
    DWOBREncashTransferRoutingModule,
    SharedModule
  ],
  declarations: [DwObrencashtransferComponent]
})
export class DWObrEncashTransferModule { }