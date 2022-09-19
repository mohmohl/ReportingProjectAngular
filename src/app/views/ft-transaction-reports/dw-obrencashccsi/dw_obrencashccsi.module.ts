import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWOBREncashCCSIRoutingModule } from './dw_obrencashccsi-routing.module';
import { DwObrencashccsiComponent } from './dw-obrencashccsi.component';

@NgModule({
  imports: [
    CommonModule,
    DWOBREncashCCSIRoutingModule,
    SharedModule
  ],
  declarations: [DwObrencashccsiComponent]
})
export class DWOBREncashCCSIModule { }