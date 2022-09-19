import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { GeneralTrialConsoReportComponent } from './general-trial-conso-report.component';
import { GeneralTrialConsoReportRoutingModule } from './general-trial-conso-report-routing.module';


@NgModule({
  imports: [
    CommonModule,
    GeneralTrialConsoReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [GeneralTrialConsoReportComponent]
})
export class GeneralTrialConsoReportModule { }