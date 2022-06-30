import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DWCCTransferRoutingModule } from './dw_cctransfer-routing.module';
import { DwCctransferComponent } from './dw-cctransfer.component';

@NgModule({
  imports: [
    CommonModule,
    DWCCTransferRoutingModule,
    SharedModule
  ],
  declarations: [DwCctransferComponent]
})
export class DWCCTransferModule { }