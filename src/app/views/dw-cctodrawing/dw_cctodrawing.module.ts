import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DwCctodrawingComponent } from './dw-cctodrawing.component';
import { DWCCTODrawingRoutingModule } from './dw_cctodrawing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DWCCTODrawingRoutingModule,
    SharedModule
  ],
  declarations: [DwCctodrawingComponent]
})
export class DWCCTODrawingModule { }