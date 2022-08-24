import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DwSubsiledgerComponent } from './dw-subsiledger.component';
import { DWSubsiLedgerRoutingModule } from './dw_subsiledger-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DWSubsiLedgerRoutingModule,
    SharedModule
  ],
  declarations: [DwSubsiledgerComponent]
})
export class DWSubsiLedgerModule { }