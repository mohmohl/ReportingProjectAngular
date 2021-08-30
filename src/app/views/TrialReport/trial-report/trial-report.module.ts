import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrialReportRoutingModule} from './trial-report-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { TrialReportComponent } from './trial-report.component';


@NgModule({
  imports: [
    CommonModule,
    TrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [TrialReportComponent]
})
export class TrialReportModule { }