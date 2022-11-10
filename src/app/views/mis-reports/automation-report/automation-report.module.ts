
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { MonthlySummaryCashComponent } from '../monthly-summary-cash/monthly-summary-cash.component';
import { AutomationReportRoutingModule } from './automation-report-routing.module';
import { AutomationReportComponent } from './automation-report.component';


@NgModule({
  declarations: [
    AutomationReportComponent
  ],
  imports: [
    CommonModule,
    AutomationReportRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class AutomationReportModule { }
