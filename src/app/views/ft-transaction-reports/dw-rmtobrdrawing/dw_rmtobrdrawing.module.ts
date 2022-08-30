import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DwRmtobrdrawingComponent } from './dw-rmtobrdrawing.component';
import { DWRMTOBRDrawingRoutingModule } from './dw_rmtobrdrawing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DWRMTOBRDrawingRoutingModule,
    SharedModule
  ],
  declarations: [DwRmtobrdrawingComponent]
})
export class DWRMTOBRDrawingModule { }