import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { LoanExcelRoutingModule } from './loanexcel-routing.module';
import { LoanproductExcelComponent } from './loanproduct-excel.component';

@NgModule({
  imports: [
    CommonModule,
    LoanExcelRoutingModule,
    SharedModule
  ],
  declarations: [LoanproductExcelComponent]
})
export class LoanExcelModule { }