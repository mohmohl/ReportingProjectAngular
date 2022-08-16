import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DWOBREncashFPTIRoutingModule } from './dw_obrencashfpti-routing.module';
import { DwObrencashfptiComponent } from './dw-obrencashfpti.component';

@NgModule({
  imports: [
    CommonModule,
    DWOBREncashFPTIRoutingModule,
    SharedModule
  ],
  declarations: [DwObrencashfptiComponent]
})
export class DWOBREncashFPTIModule { }