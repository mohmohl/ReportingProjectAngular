import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWOBREncashmentRoutingModule } from './dw_obrencashment-routing.module';
import { DwObrencashmentComponent } from './dw-obrencashment.component';

@NgModule({
  imports: [
    CommonModule,
    DWOBREncashmentRoutingModule,
    SharedModule
  ],
  declarations: [DwObrencashmentComponent]
})
export class DWObrEncashmentModule { }