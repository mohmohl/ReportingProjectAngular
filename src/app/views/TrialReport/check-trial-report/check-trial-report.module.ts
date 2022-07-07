import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { CheckTrialReportRoutingModule } from './check-trial-report-routing.module';
import { CheckTrialReportComponent } from './check-trial-report.component';


@NgModule({
  imports: [
    CommonModule,
    CheckTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [CheckTrialReportComponent]
})
export class CheckTrialReportModule { }