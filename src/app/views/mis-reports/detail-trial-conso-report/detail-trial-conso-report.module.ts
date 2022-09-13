import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { DetailTrialConsoReportRoutingModule } from './detail-trial-conso-report-routing.module';
import { DetailTrialConsoReportComponent } from './detail-trial-conso-report.component';



@NgModule({
  imports: [
    CommonModule,
    DetailTrialConsoReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DetailTrialConsoReportComponent]
})
export class DetailTrialConsoReportModule { }