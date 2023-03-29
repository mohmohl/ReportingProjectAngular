import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EOYDetailTrialReportRoutingModule } from './eoy-detail-trial-report-routing.module';
import { EOYDetailTrialReportComponent } from './eoy-detail-trial-report.component';


@NgModule({
  imports: [
    CommonModule,
    EOYDetailTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [EOYDetailTrialReportComponent]
})
export class EOYDetailTrialReportModule { }