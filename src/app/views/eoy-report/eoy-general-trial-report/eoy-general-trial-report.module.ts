import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EOYGeneralTrialReportRoutingModule } from './eoy-general-trial-report-routing.module';
import { EOYGeneralTrialReportComponent } from './eoy-general-trial-report.component';

@NgModule({
  imports: [
    CommonModule,
    EOYGeneralTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [EOYGeneralTrialReportComponent]
})
export class EOYGeneralTrialReportModule { }