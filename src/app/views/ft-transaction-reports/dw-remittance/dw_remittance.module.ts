import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DWRemittanceRoutingModule } from './dw_remittance-routing.module';
import { DwRemittanceComponent } from './dw-remittance.component';

@NgModule({
  imports: [
    CommonModule,
    DWRemittanceRoutingModule,
    SharedModule
  ],
  declarations: [DwRemittanceComponent]
})
export class DWRemittanceModule { }