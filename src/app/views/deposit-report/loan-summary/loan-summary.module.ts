import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { LoanSummaryComponent } from './loan-summary.component';
import { LoanSummaryRoutingModule } from './loan-summary-routing.module';


@NgModule({
  declarations: [
    LoanSummaryComponent
  ],
  imports: [
    CommonModule,
    LoanSummaryRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class LoanSummaryModule { }
