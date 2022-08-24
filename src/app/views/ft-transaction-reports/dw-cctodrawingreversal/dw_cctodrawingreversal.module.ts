import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWCCTODrawingReversalRoutingModule } from './dw_cctodrawingreversal-routing.module';
import { DwCctodrawingreversalComponent } from './dw-cctodrawingreversal.component';

@NgModule({
  imports: [
    CommonModule,
    DWCCTODrawingReversalRoutingModule,
    SharedModule
  ],
  declarations: [DwCctodrawingreversalComponent]
})
export class DWCCTODrawingReversalModule { }