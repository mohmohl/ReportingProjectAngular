import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DwCctodrawingComponent } from './dw-cctodrawing.component';
import { DWCCTODrawingRoutingModule } from './dw_cctodrawing-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DWCCTODrawingRoutingModule,
    SharedModule
  ],
  declarations: [DwCctodrawingComponent]
})
export class DWCCTODrawingModule { }