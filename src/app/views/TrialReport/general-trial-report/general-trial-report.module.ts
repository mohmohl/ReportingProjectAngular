import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GeneralTrialReportRoutingModule} from './general-trial-report-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { GeneralTrialReportComponent } from './general-trial-report.component';


@NgModule({
  imports: [
    CommonModule,
    GeneralTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [GeneralTrialReportComponent]
})
export class GeneralTrialReportModule { }