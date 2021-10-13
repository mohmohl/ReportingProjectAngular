import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MisTrialReportRoutingModule} from './mis-trial-report-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { MisTrialReportComponent } from './mis-trial-report.component';


@NgModule({
  imports: [
    CommonModule,
    MisTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MisTrialReportComponent]
})
export class MisTrialReportModule { }