import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DWDomesticTransferReversalRoutingModule } from './dw_domestictransferreversal-routing.module';
import { DwDomestictransferreversalComponent } from './dw-domestictransferreversal.component';

@NgModule({
  imports: [
    CommonModule,
    DWDomesticTransferReversalRoutingModule,
    SharedModule
  ],
  declarations: [DwDomestictransferreversalComponent]
})
export class DWDomesticTransferReversalModule { }