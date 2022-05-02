import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { FinanceReportsComponent } from './finance-reports.component';
import { FinanceReportRoutingModule } from './finance-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FinanceReportRoutingModule,
    SharedModule
  ],
  declarations: [FinanceReportsComponent]
})
export class FinanceReportModule { }