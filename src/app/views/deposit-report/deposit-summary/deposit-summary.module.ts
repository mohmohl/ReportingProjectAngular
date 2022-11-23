import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { DepositSummaryRoutingModule } from './deposit-summary-routing.module';
import { DepositSummaryComponent } from './deposit-summary.component';


@NgModule({
  declarations: [
    DepositSummaryComponent
  ],
  imports: [
    CommonModule,
    DepositSummaryRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class DepositSummaryModule { }
