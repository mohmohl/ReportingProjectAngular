import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanContractRoutingModule } from './loan-contract-routing.module';
import { LoanContractComponent } from './loan-contract.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LoanContractRoutingModule,
    SharedModule
  ],
  declarations: [LoanContractComponent]
})
export class LoanContractModule { }