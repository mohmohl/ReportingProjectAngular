
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { MonthlySummaryCashComponent } from './monthly-summary-cash.component';
import { MonthlySummaryCashRoutingModule } from './monthly-summary-cash-routing.module';


@NgModule({
  declarations: [
    MonthlySummaryCashComponent
  ],
  imports: [
    CommonModule,
    MonthlySummaryCashRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class MonthlySummaryCashTrModule { }
