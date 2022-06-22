import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { LoanExcelRoutingModule } from './loanexcel-routing.module';
import { LoanproductExcelComponent } from './loanproduct-excel.component';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoanExcelRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [LoanproductExcelComponent]
})
export class LoanExcelModule { }