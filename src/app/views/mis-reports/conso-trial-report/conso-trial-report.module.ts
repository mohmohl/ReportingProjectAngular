import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { ConsoTrialReportComponent } from './conso-trial-report.component';
import { ConsoTrialReportRoutingModule } from './conso-trial-report-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ConsoTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ConsoTrialReportComponent]
})
export class ConsoTrialReportModule { }